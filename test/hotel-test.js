import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/hotel';

describe('Hotel', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  describe('Hotel Data', function() {
    it('sould contain room service data', () => {
      
    })

    it('sould contain guest data', () => {

    })

    it('sould contain room data', () => {

    })

    it('sould contain booking data', () => {

    })
  })
  
});