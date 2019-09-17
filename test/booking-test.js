import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/booking';
import Hotel from '../src/hotel';
import bookings from './booking-data';
import users from './guest-data';
import roomServices from './roomService-data';
import rooms from './room-data';
import sept11data from './booking-room-data'
const data = [{roomServices:roomServices}, {users:users}, {rooms:rooms}, {bookings:bookings}]

describe('Booking', function() {
  let hotel, booking;
  
  beforeEach( () => {
    hotel = new Hotel(data);
    hotel.createDataRepo()
    booking = hotel.booking;
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should create instance of itself', () => {
    expect(booking).to.be.instanceof(Booking);
  });

  it('should find the most popular dates', () => {
    let mostPopular = [ '2019/09/07', '2019/10/23', '2019/10/28' ]
    let dates = booking.getMostPopularDates()
    expect(dates).to.be.to.eql(mostPopular);
  });

  it('should find the dates with the most avalibility', () => {
    let leastPopular =  [ '2019/07/23' ]
    let dates = booking.getLeastPopularDate()

    expect(dates).to.eql(leastPopular);
  });

  it('should find all of the rooms that are booked on a given date', () => {
    let date = '2019/09/11'
    let roomList = hotel.rooms;
    let rooms = booking.getBookingsByDate(date, roomList)
    expect(rooms.length).to.equal(29);
    expect(rooms).to.eql(sept11data)
  });

  it.only('should be able to book a room', () => {
    let room = {
      userID: 1,
      date: '2019/09/17',
      roomNumber: 100
    };

    expect(booking.bookings.length).to.equal(2001)
    booking.bookRoom(room)

    let lastRoom = booking.bookings[booking.bookings.length - 1]
    
    expect(booking.bookings.length).to.equal(2002);
    expect(room).to.eql(lastRoom);
  });

});