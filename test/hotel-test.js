import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/hotel';

import bookings from './booking-data';
import users from './guest-data';
import roomServices from './roomService-data';
import rooms from './room-data';
const data = [{roomServices:roomServices}, {users:users}, {rooms:rooms}, {bookings:bookings}]

describe('Booking', function() {
  let hotel;
  
  beforeEach( () => {
    hotel = new Hotel(data);
  });



describe('Hotel', function() {

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  describe('Hotel Data', () => {
    it('should contain room service data', () => {
      
    })

    it('should contain guest data', () => {

    })

    it('should contain room data', () => {

    })

    it('should contain booking data', () => {

    })
  })
  
});