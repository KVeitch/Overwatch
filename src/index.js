// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let roomServices, userData, roomData, bookings;
// roomservice data
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices')
  .then(data => data.json())
  .then(data => {roomServices = data.roomServices})
  .then(()=>{console.log('roomServices',roomServices)})

// .then(data => {assignRoomServiceData(data.roomServices)})

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(data => data.json())
  .then(data => {userData = data.users});
  // .then(()=>{console.log('userData',userData)})

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .then(data => {roomData = data.rooms});
  // .then(()=>{console.log('roomData',roomData)})

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .then(data => {bookings = data.bookings})
  .then(()=>{console.log('bookings',bookings)});



  // Show the first tab by default
$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav .button:first').addClass('tab-active');

// Change tab class and display content
$('.tabs-nav a').on('click', function(event){
  event.preventDefault();
  $('.tabs-nav .button').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});