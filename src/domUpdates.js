import $ from 'jquery';
const domUpdates = {

  updateClock() {
    let time = new Date().toLocaleTimeString('en-US', 
      { hour: 'numeric', hour12: true, minute: 'numeric' }
    )
    $('#time').html(time);
    setTimeout(domUpdates.updateClock, 60000);
  },

  setCurrentDate(today) {
    $('#date').html(today);
  },
  
  populateDOMList(name, id) {
    $('#js-guest-list').append(`<option value='${id}'> ${name} </option>`);
  },

  updateAvailableRooms(number) {
    $('.js-available-rooms').text(number);
  },

  updateBookedRooms(percent) {
    $('.js-booked-rooms').text(` ${percent}%`);
  },
  
  updateTodayRevenue(revenue) {
    $('.js-renevue').text(`$${revenue}`);
  },

  updateCurrentGuest(name) {
    $('.js-current-guest').text(name);
  },

  displayNew() {
    $('.js-new-guest').show();
  },

  hideNew() {
    $('.js-new-guest').hide();
  },

  updateOrderListByDate(order) {
    if (order) {
      $('.js-order-list').append(
        `<li>${order.food} / Price: $${order.totalCost}</li>`
      );
    } else {
      $('.js-order-list').append('No Orders Today');
    }
  },

  displayAllTimeSales(amount) {
    $('.js-all-time-sale').text(amount);
  },

  displayChosenDateOrders(order) {
    $('.js-order-list-by-date').append(
      `<li>${order.food} / Price: $${order.totalCost}</li>`
    );
  },

  clearOrderByDate() {
    $('.js-order-list-by-date').html('');
  },

  displayCurrentCustomerPastOrders(order) {
    $('.js-current-guest-orders').append(
      `<li>Ordered ${order.food} on ${order.date} for $${order.totalCost}</li>`
    );
  },

  clearCurrentCustomerPastOrders() {
    $('.js-current-guest-orders').html('');
  },

  displayDailyTotals(date, money) {
    $('.js-daily-totals').append(
      `<p class="list">${date} / ${money.toFixed(2)}</p>`
    );
  },

  displayMostPopularDay(day) {
    $('.js-most-booked').append(`| ${day} |`);
  },

  displayLeastPopularDay(day) {
    $('.js-least-booked').append(`| ${day} |`);
  },

  displayRoomsByDate(room) {
    let hasBidet = room.bidet ? 'Yes' : 'No';

    $('.js-room-by-date-table').append(
      `<tr>
      <td class=js-rm-type">${room.roomType}</td>
      <td class="js-rm-number">${room.number}</td>
      <td class="js-rm-bed-type">${room.bedSize}</td>
      <td class="js-rm-bed-num">${room.numBeds}</td>
      <td class="js-rm-bidet">${hasBidet}</td>
      <td class="js-rm-per-night">${room.costPerNight}</td>
      <td><button class="js-booking-btn" value="${room.number}" >Book Room</button></td>
      </tr>`
    );
  },

  clearRoomsByDate() {
    $('.js-room-by-date-table').html('');
  },

  clearGuestRoomHistory() {
    $('.js-guest-room-history-table').html('');
  },

  displayGuestRoomHistory(room) {
    $('.js-guest-room-history-table').append(
      `<tr><td class="js-guest-hist-rm">${room.date}</td>
      <td class="js-guest-hist-rm">${room.roomNumber}</td>
      </tr>`
    );
  },

}

export default domUpdates; 