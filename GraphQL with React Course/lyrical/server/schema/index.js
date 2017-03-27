import { GraphQLSchema } from 'graphql';
import RootQueryType from './root_query_type';
import mutations from './mutations';

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations,
});
