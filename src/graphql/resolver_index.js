//resolver_index.js

const teacher_resolver = require("./teacher/resolver");
 const principal_resolver=  require("./principal/resolver")
module.exports = {
  Query: {
    ...teacher_resolver.Query,
    ...principal_resolver.Query
  },

  Mutation: {
    ...teacher_resolver.Mutation,
    ...principal_resolver.Mutation
  },
};
