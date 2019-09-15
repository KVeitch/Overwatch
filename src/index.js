// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import $ from 'jquery';
import './css/base.scss';
import './images/bed.svg'
// import './images'
import '../src/images/mountain.jpg';
import domUpdates from './domUpdates';
import Hotel from './hotel';
let today = `${new Date().getFullYear()}/${String( new Date()
  .getMonth() + 1)
  .padStart(2, '0')}/${String(new Date().getDate())
  .padStart(2, '0')}`;

let hotel;
//Data import from server
let servicesData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices')
  .then(data => data.json());

let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(data => data.json());

let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json());

let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json());
  
Promise.all([servicesData, userData, roomData, bookingData])
  .then(data => hotel = new Hotel(data))
  // .then(()=>populateGuestList())
  .then(()=>initialDOMPopulate())

//Starts Clock on header and set todays date
domUpdates.updateClock()
domUpdates.setCurrentDate(today)

// Displays the first tab by default
$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav .button:first').addClass('tab-active');

// Change tab class and display content
$('.tabs-nav a').on('click', function(event) {
  event.preventDefault();
  $('.tabs-nav .button').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});

function populateGuestList() {
  hotel.guests
    .sort((guestA, guestB) => (guestA.name > guestB.name) ? 1 : -1)
    .forEach(guest=> {
      domUpdates.populateDOMList(guest.name, guest.id)
    })
}

$('#js-select-guest').click(()=>selectGuest())


function selectGuest() {
  if ($('#js-guest-list').val() === 'new') {
    hotel.newGuest()
  } else {
  //create current guest
  //update the DOM for the GUEST
  console.log('selectGuest', $('#js-guest-list').val())
  }
}

function initialDOMPopulate() {
  let percentAvailable = hotel.getPercentRoomsAvailable(today);
  let revenue = hotel.getTotalRevenue(today);
  console.log('index', revenue)
  populateGuestList();
  domUpdates.updateAvailableRooms(percentAvailable.available);
  domUpdates.updateBookedRooms(percentAvailable.taken);
  domUpdates.updateTodayRevenue(revenue);

}
