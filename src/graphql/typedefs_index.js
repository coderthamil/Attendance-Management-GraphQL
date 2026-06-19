// Import type definitions
const { gql } = require("apollo-server-express");
const teacher_TypeDef = require("./teacher/typedefs")
const principal_TypeDef=require("./principal/typedefs")
const root_schema = gql`
  type Query {
    _: String
      
  }

  type Mutation {
    _: String
    
  }
`;

// Export as an array
module.exports = [root_schema,teacher_TypeDef,principal_TypeDef];
