class Hotel {
  constructor(data) {
    this.roomServices = data[0].roomServices;
    this.guests = data[1].users;
    this.rooms = data[2].rooms;
    this.bookings = data[3].bookings;
    this.currentGuest = {name:'Please Select a guest', id:0}
  }
  getGuest(name) { 
    return this.guests.find(guest => guest.name === name) 
  }



}

export default Hotel;