import chai from 'chai';
const expect = chai.expect;
import Guest from '../src/guest';
import Hotel from '../src/hotel';
import bookings from './booking-data';
import users from './guest-data';
import roomServices from './roomService-data';
import rooms from './room-data';

let data = [{roomServices:roomServices},{users:users},{rooms:rooms},{bookings:bookings}]


describe('Guest', function() {
  let hotel, guest;
  beforeEach( () => {
    hotel = new Hotel(data);
    hotel.getCurrentGuest(1);
    guest = hotel.currentGuest;
  });
  
  it('should be a function', () => {
    expect(Guest).to.be.a('function');
  });

  it('should have a name', () => {
    expect(guest.name).to.equal('Matilde Larson');
  });

  it('should be have an Id', () => {
    expect(guest.id).to.equal(1);
  });

  it('should be have an know its bookings', () => {
    expect(guest.bookings.length).to.equal(19);
  });

  it('should know its room services orders', () => {
    expect(guest.roomServices.length).to.equal(1);
  });


  it('should be able to book a room', () => {
    let room = {
      userID: 1,
      date: '2019/09/17',
      roomNumber: 100
    };
    expect(guest.bookings.length).to.equal(19);
    guest.bookGuestRoom(room);
    expect(guest.bookings.length).to.equal(20);
    expect(guest.bookings[19].roomNumber).to.equal(100)

  });

});