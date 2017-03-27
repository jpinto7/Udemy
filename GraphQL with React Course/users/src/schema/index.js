import axios from 'axios'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: ({ id }, args) => (
        axios.get(`http://localhost:3000/companies/${id}/users`)
          .then(resp => resp.data)
      ),
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: ({ companyId }, args) => (
        axios.get(`http://localhost:3000/companies/${companyId}`)
          .then(resp => resp.data)
      ),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, { id }) => (
        axios.get(`http://localhost:3000/users/${id}`)
          .then(resp => resp.data)
      ),
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (parentValue, args) => (
        axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => resp.data)
      ),
    },
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve: (parentValue, { firstName, age }) => (
        axios.post('http://localhost:3000/users/', {
          firstName,
          age,
        }).then(resp => resp.data)
      ),
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, { id }) => (
        axios.delete(`http://localhost:3000/users/${id}`)
          .then(resp => resp.data)
      ),
    },
    editUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, { firstName, age, id }) => (
        axios.patch(`http://localhost:3000/users/${id}`, {
          firstName,
          age
        }).then(resp => resp.data)
      ),
    }
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
