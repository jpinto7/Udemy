import mongoose from 'mongoose';
import SongSchema from './song';
import LyricSchema from './lyric';

export const SongModel = mongoose.model('song', SongSchema);
export const LyricModel = mongoose.model('lyric', LyricSchema);
