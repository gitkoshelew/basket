const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/type-defs");
const resolvers = require("./src/resolvers");
const session = require("express-session");

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.session = req.session;
  next();
});
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
