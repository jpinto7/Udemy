import mongoose from 'mongoose';
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import SongType from './song_type';
import LyricType from './lyric_type';

const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({});
      },
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Song.findById(id);
      },
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Lyric.findById(id);
      },
    },
  }),
});

export default RootQuery;
