import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/hotel';
import guestsData from './guest-1-2-data'
import bookings from './booking-data';
import users from './guest-data';
import roomServices from './roomService-data';
import rooms from './room-data';
import roomSubSetData from './room-1-25-50-data';
const data = [{roomServices:roomServices}, {users:users}, {rooms:rooms}, {bookings:bookings}]





describe('Hotel', function() {
  let hotel;
  beforeEach( () => {
    hotel = new Hotel(data);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  describe('hotel data', () => {
    it('should contain room service data', () => {
      expect(hotel.roomServices).to.be.an('array');
    });

    it('should contain guest data', () => {
      expect(hotel.guests).to.be.an('array');
      expect(hotel.guests.length).to.equal(101);
    });

    it('should contain room data', () => {
      expect(hotel.bookings).to.be.an('array');
      expect(hotel.bookings.length).to.equal(2002);

    });

    it('should contain booking data', () => {
      expect(hotel.rooms).to.be.an('array');
      expect(hotel.rooms.length).to.equal(50);
    });

  });

  it('should return the avalible rooms for a given date', () => {
    let date1 = '2019/09/11';
    let date2 = '2019/09/01';
    let roomTotal1 = hotel.getTotalRoomsAvailable(date1);
    let roomTotal2 = hotel.getTotalRoomsAvailable(date2);
    expect(roomTotal1).to.equal(29);
    expect(roomTotal2).to.equal(32);

  });
  
  it('should calculate the get the data to calculate percent of rooms available on given day ', () => {
    let date1 = '2019/09/11';
    let date2 = '2019/09/02';
    let rmsForPercent1 = hotel.getPercentRoomsAvailable(date1);
    let rmsForPercent2 = hotel.getPercentRoomsAvailable(date2);
    expect(rmsForPercent1).to.eql({ available: 29, taken: '42' });
    expect(rmsForPercent2).to.eql({ available: 30, taken: '40' });
    
  });
  describe('hotel revenue', () => {
    it('should return all orders on a given date', () => {
      let date = '2019/09/11';
      let sept11Orders = [
        {
          userID: 23,
          date: '2019/09/11',
          food: 'Awesome Cotton Sandwich',
          totalCost: 20.79
        },
        {
          userID: 47,
          date: '2019/09/11',
          food: 'Gorgeous Concrete Sandwich',
          totalCost: 22.99
        }
      ];

      let testOrders = hotel.getAllOrders(date);

      expect(testOrders).to.eql(sept11Orders);
    });

    it('should return all room service revenu on a given dat', () => {
      let date = '2019/09/11'
      let serviceRevenue = hotel.getServicesRevenue(date);
      expect(serviceRevenue).to.equal(43.78);
    });

    it('should return all service renenue on a given date', () => {
      let date = '2019/09/11';
      let roomRevenue = hotel.getRoomsRevenue(date);
      expect(roomRevenue).to.equal(6632.30);
    });

    it('should return all renenue on a given date', () => {
      let date = '2019/09/11';
      let totalRevenue = hotel.getTotalRevenue(date);
      expect(totalRevenue).to.equal('6676.08');
    });
  });


  it('should be able to change guests', () => {
    expect(hotel.currentGuest).to.eql({name:'Please Select a guest', id:0});
    hotel.getCurrentGuest(1);
    expect(hotel.currentGuest).to.eql(guestsData.guest1);
    hotel.getCurrentGuest(2);
    expect(hotel.currentGuest).to.eql(guestsData.guest2);
  });

  it('should be able to add guests to guest list', () => {
    expect(hotel.guests.length).to.equal(100);

    hotel.addGuestToGuests('Bob Villia');

    expect(hotel.guests.length).to.equal(101);

  });

  it('should create repositories for data', () => {
    expect(hotel.order).to.not.exist;
    expect(hotel.booking).to.not.exist;
    hotel.createDataRepo();
    expect(hotel.order).to.exist;
    expect(hotel.booking).to.exist;

  });

  it('should return a room by room number', () => {
    let room1 = hotel.getRoom(1);
    let room25 = hotel.getRoom(25);
    let room50 = hotel.getRoom(50);
    expect(room1).to.eql(roomSubSetData.room1);
    expect(room25).to.eql(roomSubSetData.room25);
    expect(room50).to.eql(roomSubSetData.room50);        
  });
  
});