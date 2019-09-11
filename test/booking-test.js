import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/booking';

describe('Booking', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  })

});