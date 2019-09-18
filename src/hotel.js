import Guest from './guest'
import Order from './order'
import Booking from './booking'

class Hotel {
  constructor(data) {
    this.roomServices = data[0].roomServices;
    this.guests = data[1].users;
    this.rooms = data[2].rooms;
    this.bookings = data[3].bookings;
    this.currentGuest = {name:'Please Select a guest', id:0}
  }

  getTotalRoomsAvailable (date) {
    let booked = this.bookings.reduce((acc, booking) => {
      if (booking.date === date) {
        acc++;
      }
      return acc;
    }, 0);
    return this.rooms.length - booked;
  }

  getPercentRoomsAvailable(date) {
    let percentRoomsTaken = (100 * (1-this.getTotalRoomsAvailable(date)/this.rooms.length)).toFixed(0);

    return {available: this.getTotalRoomsAvailable(date), taken: percentRoomsTaken}
  }

  getAllOrders(date) {
    return this.roomServices.filter(service => service.date === date)
  }

  getTotalRevenue(date) {
    return (this.getRoomsRevenue(date) + this.getServicesRevenue(date)).toFixed(2);
  }

  getRoomsRevenue(date) {
    return this.rooms.reduce((revenue, room) => {
      this.bookings.forEach(booking => {
        if (room.number === booking.roomNumber && booking.date === date) {
          revenue += room.costPerNight;
        }
      });
      return revenue;
    }, 0);
  }

  getServicesRevenue(date) {
    let orders = this.getAllOrders(date);
    return orders.reduce((revenue, order) => revenue += order.totalCost, 0)
  }

  getCurrentGuest(currentID) {
    let id = parseInt(currentID)
    let guest = this.guests.find(guest => guest.id === id);
    let guestBooking = this.bookings.filter(booking => booking.userID === id);
    let guestService = this.roomServices.filter(services => services.userID === id);

    this.currentGuest = new Guest (guest, guestBooking, guestService)
  }

  addGuestToGuests(guestName) {
    let id = (this.guests.length + 1);
    this.guests.push({name: guestName, id:id})
    return id;
  }

  createDataRepo() {
    this.order = new Order (this.roomServices)
    this.booking = new Booking (this.bookings)
  }

  getRoom(roomNumber) {
    return this.rooms.find(room => room.number === parseInt(roomNumber))
  }  


}

export default Hotel;