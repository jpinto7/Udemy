import mongoose from 'mongoose';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import LyricType from './lyric_type';

const Song = mongoose.model('song');

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue) {
        return Song.findLyrics(parentValue.id);
      },
    },
  }),
});

export default SongType;
