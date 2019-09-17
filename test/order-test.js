import chai from 'chai';
const expect = chai.expect;
import Order from '../src/order';
import Hotel from '../src/hotel';
import bookings from './booking-data';
import users from './guest-data';
import roomServices from './roomService-data';
import rooms from './room-data';
import ordersTotalPerDay from './orderTotalPerDay'
let data = [{roomServices:roomServices}, {users:users}, {rooms:rooms}, {bookings:bookings}]

describe('Order', function() {
  
  let hotel, order;
  
  beforeEach( () => {
    hotel = new Hotel(data);
    hotel.createDataRepo()
    order = hotel.order;
  });
  
  it('should be a function', () => {
    expect(Order).to.be.a('function');
  });


  it('should be store room service data', () => {
    expect(order.orders.length).to.equal(100);
  });

  it('should be able to get orders by date', () => {
    let date = '2019/09/11'
    let returnedOrders = order.getOrdersByDate(date)

    expect(returnedOrders.length).to.equal(2);
    expect(returnedOrders[0].food).to.eql('Awesome Cotton Sandwich');
  });

  it('should be able to add new orders', () => {
    let guestOrder = {
      userID: 50,
      date: '2019/09/11',
      food: 'Tasty Granite Sandwich',
      totalCost: 0.0
    };
    expect(order.orders.length).to.equal(100)
    order.addNewOrder(guestOrder)
    expect(order.orders.length).to.equal(101);
  });

  it('should be able to return the sum of all orders', () => {
    order.getAllTimeOrderTotal()
    expect(order.getAllTimeOrderTotal()).to.eql('1534.93');
  });

  it('should be able to return the total for each day', () => {
    
    let ordersPerDay = order.getTotalForEachDay()
    expect(ordersPerDay).to.eql(ordersTotalPerDay);
  });

});