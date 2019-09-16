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
    return this.orders.reduce((acc, order) => acc += order.totalCost, 0).toFixed(2)
  }
}


export default Order;