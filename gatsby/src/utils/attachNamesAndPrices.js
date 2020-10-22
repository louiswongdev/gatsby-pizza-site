import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const foundPizza = pizzas.nodes.find((pizza) => pizza.id === item.id);

    return {
      ...item,
      name: foundPizza.name,
      thumbnail: foundPizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(foundPizza.price, item.size)),
    };
  });
}
