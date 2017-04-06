import mongoose from 'mongoose';
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import UserType from './user_type';

const User = mongoose.model('user');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id);
      },
    },
  }),
});

export default RootQueryType;
