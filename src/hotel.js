import Guest from './guest'

class Hotel {
  constructor(data) {
    this.roomServices = data[0].roomServices;
    this.guests = data[1].users;
    this.rooms = data[2].rooms;
    this.bookings = data[3].bookings;
    this.currentGuest = {name:'Please Select a guest', id:0}
  }

  getGuest(id) { 
    return this.guests.find(guest => guest.name === name) 
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
    let percentRoomsAvailable = (100 * (this.getTotalRoomsAvailable(date) /
        this.rooms.length)).toFixed(0);
    let percentRoomsTaken = (100 * (1 - percentRoomsAvailable)).toFixed(0);

    return {available: percentRoomsAvailable, taken: percentRoomsTaken}
  }

  getAllOrders(date) {
    return this.roomServices.filter(service => service.date === date)
  }

  getTotalRevenue(date) {
    return this.getRoomRevenue(date) + this.getServicesRevenue(date);
  }

  getRoomsRevenue(date) {
    this.rooms.reduce((revenue, room) => {
      this.booking.forEach(booking => {
        if (room.number === booking.roomNumber && booking.date === date) {
          revenue += room.costPerNight;
        }
      });
      return revenue;
    }, 0);
  }

  getServicesRevenue(date) {
    let orders = this.getAllOrders(date);
    orders.reduce((revenue, order) => revenue + order.totalCost, 0)
  }

}

export default Hotel;