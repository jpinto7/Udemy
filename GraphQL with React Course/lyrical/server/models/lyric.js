import mongoose, { Schema } from 'mongoose';

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song',
  },
  likes: { type: Number, default: 0 },
  content: { type: String },
});

LyricSchema.statics.like = function (id) {
  const Lyric = mongoose.model('lyric');
  return Lyric.findById(id)
   .then((lyric) => {
     lyric.likes += 1;
     return lyric.save();
   });
};

export default LyricSchema;
