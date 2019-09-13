import $ from 'jquery';
const domUpdates = {

  updateClock() {
    let time = new Date().toLocaleTimeString('en-US', 
      { hour: 'numeric', hour12: true, minute: 'numeric' }
    )
    $('#time').html(time);
    setTimeout(domUpdates.updateClock, 60000);
  },


}

export default domUpdates; 