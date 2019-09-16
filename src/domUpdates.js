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
    $('#date').html(today)
  },
  
  populateDOMList(name, id) {
    $('#js-guest-list').append(`<option value='${id}'> ${name} </option>`)
  },

  updateAvailableRooms(number) {
    $('.js-available-rooms').text(number)
  },

  updateBookedRooms(percent) {
    $('.js-booked-rooms').text(` ${percent}%`)
  },
  
  updateTodayRevenue(revenue) {
    $('.js-renevue').text(revenue)
  },

  updateCurrenTGuest(name) {
    $('.js-current-guest').text(name)
  },

  displayNew() {
    $('.js-new-guest').show()
    console.log('display New')
  },

  hideNew() {
    $('.js-new-guest').hide()
    console.log('hide new')
  },

}

export default domUpdates; 