import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // Loop over each item in the order
  return order.reduce((acc, singleOrder) => {
    const orderedPizza = pizzas.nodes.find(
      (pizza) => pizza.id === singleOrder.id
    );
    return acc + calculatePizzaPrice(orderedPizza.price, singleOrder.size);
  }, 0);
}
