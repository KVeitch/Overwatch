import chai from 'chai';
const expect = chai.expect;
import Guest from '../src/guest';

describe('Guest', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Guest).to.be.a('function');
  })

});