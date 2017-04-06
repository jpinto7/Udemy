import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
  },
});

export default UserType;
