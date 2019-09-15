class Guest {
  constructor(guest, roomData, bookings, services) {
    Object.assign(this, guest)
    this.room = room
    this.bookings = bookings
    this.roomServices = services;
  }
  
}

export default Guest;