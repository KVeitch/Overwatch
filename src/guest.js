class Guest {
  constructor(guest, bookings, services, roomData) {
    Object.assign(this, guest)
    this.room = roomData || 0
    this.bookings = bookings
    this.roomServices = services;
  }
  
}

export default Guest;