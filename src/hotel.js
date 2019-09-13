class Hotel {
  constructor(data) {
    this.roomServices = data[0].roomServices;
    this.guests = data[1].users;
    this.rooms = data[2].rooms;
    this.bookings = data[3].bookings;
  }
  report() { 
    console.log(this)
  }
}

export default Hotel;