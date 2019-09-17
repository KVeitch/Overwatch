class Order {
  constructor(orders) {
    this.orders = orders;
  }

  getOrdersByDate(date) {
    return this.orders.filter(order => order.date === date)
  }

  addNewOrder(order) {
    this.orders.push(order);
  }

  getAllTimeOrderTotal() {
    return this.orders.reduce((acc, order) => 
      acc += order.totalCost, 0)
      .toFixed(2)
  }

  getTotalForEachDay() {
    return this.orders.reduce((acc, order) => {
      if (!acc[order.date]) { 
        acc[order.date] = 0 
      }
      acc[order.date] += order.totalCost     
      return acc
    }, {})
  }

}

export default Order;