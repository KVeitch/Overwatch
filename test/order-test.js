import chai from 'chai';
const expect = chai.expect;
import Order from '../src/order';

describe('Order', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Order).to.be.a('function');
  })

});