/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */

import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

Meteor.methods({
  'bins.insert'() {
    return Bins.insert({
      createdAt: new Date(),
      content: '',
      sharedWith: [],
      ownerId: this.userId,
    });
  },
  'bins.remove'(bin) {
    check(bin, Match.ObjectIncluding({
      createdAt: Date,
      content: String,
      sharedWith: Match.Maybe([String]),
    }));
    return Bins.remove(bin);
  },
  'bins.update'(binId, content) {
    check(binId, String);
    check(content, String);
    return Bins.update(binId, { $set: { content } });
  },
  'bins.share'(binId, email) {
    check(binId, String);
    check(email, String);
    return Bins.update(binId, { $push: { sharedWith: email } });
  },
});

export const Bins = new Mongo.Collection('bins');
