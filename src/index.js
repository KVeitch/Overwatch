// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import $ from 'jquery';
import './css/base.scss';
import './images/bed.svg';
import './images/user.svg';
import './images/room-service.svg';
import './images/reception.svg';
import './sorttable'
// import './images'
import '../src/images/mountain.jpg';
import domUpdates from './domUpdates';
import Hotel from './hotel';
let today = `${new Date().getFullYear()}/${String(
  new Date().getMonth() + 1
).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}`;

// Change date to any other date
// today = '2019/09/11'

let hotel;
//Data import from server
let servicesData = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices'
).then(data => data.json());

let userData = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users'
).then(data => data.json());

let roomData = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms'
).then(data => data.json());

let bookingData = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings'
).then(data => data.json());

Promise.all([servicesData, userData, roomData, bookingData])
  .then(data => (hotel = new Hotel(data)))
  .then(() => hotel.createDataRepo())
  .then(() => initialDOMPopulate());

//Starts Clock on header and set todays date
domUpdates.updateClock();
domUpdates.setCurrentDate(today);

// Displays the first tab by default
$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav .button:first').addClass('tab-active');

// Change tab class and display content
$('.tabs-nav a').on('click', function(event) {
  event.preventDefault();
  $('.tabs-nav .button').removeClass('tab-active');
  $(this)
    .parent()
    .addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});

function initialDOMPopulate() {
  let percentAvailable = hotel.getPercentRoomsAvailable(today);
  let revenue = hotel.getTotalRevenue(today);
  let totalSales = hotel.order.getAllTimeOrderTotal();

  populateGuestList();
  domUpdates.updateAvailableRooms(percentAvailable.available);
  domUpdates.updateBookedRooms(percentAvailable.taken);
  domUpdates.updateTodayRevenue(revenue);
  domUpdates.displayAllTimeSales(totalSales);
  displayRoomServiceDaylyTotal();
  updateTodayOrder(today);
  displayMostPopularDates();
}

function displayMostPopularDates() {
  let mostDates = hotel.booking.getMostPopularDates();
  let leastDates = hotel.booking.getLeastPopularDate();

  mostDates.forEach(day => domUpdates.displayMostPopularDay(day));
  leastDates.forEach(day => domUpdates.displayLeastPopularDay(day));
}

function displayRoomServiceDaylyTotal() {
  let dailyOrderTotals = hotel.order.getTotalForEachDay();
  Object.keys(dailyOrderTotals).forEach(date => {
    let money = dailyOrderTotals[date];
    domUpdates.displayDailyTotals(date, money);
  });
}

function populateGuestList() {
  hotel.guests
    .sort((guestA, guestB) => (guestA.name > guestB.name ? 1 : -1))
    .forEach(guest => {
      domUpdates.populateDOMList(guest.name, guest.id);
    });
}

$('#js-select-guest').click(() => selectGuest());

function selectGuest() {
  if ($('#js-guest-list').val() === 'new') {
    domUpdates.displayNew();
    domUpdates.clearCurrentCustomerPastOrders();
  } else {
    hotel.getCurrentGuest($('#js-guest-list').val());
    domUpdates.updateCurrentGuest(hotel.currentGuest.name);
    updateGuestCurrentOrderList();
    updateGuestRoomHistory();
    domUpdates.showCurrentGuestItems();
  }
}

function updateGuestCurrentOrderList() {
  domUpdates.clearCurrentCustomerPastOrders();
  hotel.currentGuest.roomServices.forEach(order =>
    domUpdates.displayCurrentCustomerPastOrders(order)
  );
}

function updateGuestRoomHistory() {
  domUpdates.clearGuestRoomHistory();
  hotel.currentGuest.bookings.forEach(room =>
    domUpdates.displayGuestRoomHistory(room)
  );
}

$('.new-guest-btn').click(createNewGuest);

function createNewGuest() {
  if ($('#js-new-guest-name').val() !== '') {
    let name = $('#js-new-guest-name').val();
    hotel.getCurrentGuest(hotel.addGuestToGuests(name));
    domUpdates.hideNew();
    domUpdates.populateDOMList(hotel.currentGuest.name, hotel.currentGuest.id);
    domUpdates.updateCurrentGuest(hotel.currentGuest.name);
    domUpdates.showCurrentGuestItems()
    $('#js-new-guest-name').val('');
    $('#js-guest-list').val(hotel.currentGuest.id)
  }
}

function updateTodayOrder(date) {
  hotel.order.getOrdersByDate(date)
    .forEach(order => domUpdates.updateOrderListByDate(order));
}

$('#js-order-by-date-btn').click(ordersByDate);

function ordersByDate() {
  let date = $('#js-order-date').val().split('-').join('/');
  domUpdates.clearOrderByDate();
  hotel.order
    .getOrdersByDate(date)
    .forEach(order => domUpdates.displayChosenDateOrders(order));
}

$('#js-room-by-date-btn').click(roomByDate);

function roomByDate() {
  let date = $('#js-room-date').val().split('-').join('/');
  if (date) {
    let rooms = hotel.booking.getBookingsByDate(date, hotel.rooms);

    domUpdates.clearRoomsByDate();
    rooms.forEach(room => domUpdates.displayRoomsByDate(room));
  }
}

$('#room-avalibility-table').click(bookRoom)

function bookRoom(e) {
  if (e.target.classList.contains('js-booking-btn') && hotel.currentGuest) {
    let selectedDate = $('#js-room-date').val().split('-').join('/')
    let selectedRoom = parseInt(e.target.value);
    let room = {
      userID: hotel.currentGuest.id,
      date: selectedDate,
      roomNumber: selectedRoom
    };
    
    hotel.currentGuest.bookGuestRoom(room);
    hotel.booking.bookRoom(room);
  }
}