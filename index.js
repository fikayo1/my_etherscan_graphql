// Import ApolloServer from apollo-server package to set up the GraphQL server
const { ApolloServer } = require("apollo-server");

// Import schema from schema.graphql file using graphql-import
const { importSchema } = require("graphql-import");

// Import custom EtherDataSource for resolving GraphQL queries
const EtherDataSource = require("./datasource/ethDatasource");

// Import schema from schema.graphql
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();


// Define resolvers mapping query fields to data source methods
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Call etherBalanceByAddress() method on data source
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Call totalSupplyOfEther() method on data source  
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Call getLatestEthereumPrice() method on data source
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Call getBlockConfirmationTime() method on data source
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // Pass EtherDataSource instance to dataSources function
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Set timeout and start server
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});
