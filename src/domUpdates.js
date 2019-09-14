import $ from 'jquery';
const domUpdates = {

  updateClock() {
    let time = new Date().toLocaleTimeString('en-US', 
      { hour: 'numeric', hour12: true, minute: 'numeric' }
    )
    $('#time').html(time);
    setTimeout(domUpdates.updateClock, 60000);
  },

  setCurrentDate() {
    let today = `${new Date().getFullYear()}/${String( new Date()
      .getMonth() + 1)
      .padStart(2, '0')}/${String(new Date().getDate())
      .padStart(2, '0')}`;
    $('#date').html(today)
  },
  
  populateDOMList(name, id) {
    $('#js-guest-list').append(`<option value='${id}'> ${name} </option>`)
  },

}

export default domUpdates; 