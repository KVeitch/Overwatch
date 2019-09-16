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

}


export default Order;