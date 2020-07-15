const productsMap = require("../mocks/products");

const resolvers = {
  Query: {
    allProducts: (_, { filter }) => {
      return makeAsync(
        filter
          ? Object.values(productsMap).filter((event) =>
              event.title.includes(filter)
            )
          : Object.values(productsMap)
      );
    },
    product: (_, { id }) => makeAsync(productsMap[id]),
  },

  Product: {
    id: (obj) => obj._id,
  },
};

function makeAsync(data, timeout = 1000) {
  return new Promise((resolve) => setTimeout(() => resolve(data), timeout));
}

module.exports = resolvers;
