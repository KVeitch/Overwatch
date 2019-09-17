class Booking {
  constructor(bookings) {
    this.bookings = bookings;
  }
  
  sortDataToObject() {
    return this.bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = 0
      }
      acc[booking.date]++
      return acc;
    }, {})
  }

  getMostPopularDates() {
    let formattedData = this.sortDataToObject();
    let data = Object.values(formattedData).sort((a, b)=> b - a);

    return Object.keys(formattedData).filter(date => {
      return formattedData[date] === data[0];
    }).sort((a, b) => a > b ? 1 : -1);
  }

  getLeastPopularDate() {
    let formattedData = this.sortDataToObject()
    let data = Object.values(formattedData).sort((a, b)=> a - b)

    return Object.keys(formattedData).filter(date => {
      return formattedData[date] === data[0]
    }).sort((a, b) => a > b ? 1 : -1)
  }

  getBookingsByDate(date, roomList) {
    let bookedrooms = this.bookings.filter(booking => booking.date === date)
      .map(booking => booking.roomNumber);

    return roomList.filter(room=>!bookedrooms.includes(room.number))
  }

  bookRoom(room) {
    this.bookings.push(room)
  }
}

export default Booking;