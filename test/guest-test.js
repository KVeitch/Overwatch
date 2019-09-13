import chai from 'chai';
const expect = chai.expect;
import Guest from '../src/guest';

describe('Guest', function() {

  it('should be a function', () => {
    expect(Guest).to.be.a('function');
  });
  let guestData = {
    id: 1,
    name: 'Matilde Larson'
  }

  let guest = new Guest(guestData)

  it('should have a name', () => {
    expect(guest.name).to.equal('Matilde Larson');
  });

  it('should be have an Id', () => {
    expect(guest.id).to.equal(1);
  });

});