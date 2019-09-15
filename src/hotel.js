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
      return acc
    }, 0);
    return this.rooms.length - bookedRooms
  }

  getAllOrders(date) {
    return this.roomServices.filter(service => service.date === date)
  }

  getTotalRevenue(date) {
    return getRoomRevenue(date) + getServicesRevenue(date);
  }

  getRoomsRevenue(date) {
    
  }

  getServicesRevenue(date) {
    let orders = this.getAllOrders(date);
    orders.reduce((revenue, order) => revenue + order.totalCost, 0)
  }



}

export default Hotel;