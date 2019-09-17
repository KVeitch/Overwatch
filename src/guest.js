class Guest {
  constructor(guest, bookings, services, roomData) {
    Object.assign(this, guest)
    this.room = roomData || 0
    this.bookings = bookings
    this.roomServices = services;
  }
  
  bookGuestRoom(room) {
    this.bookings.push(room)
  }
  
}

export default Guest;