import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { image, helpers } from 'faker';
import { Employees } from '../imports/collections/Employees';

Meteor.startup(() => {
  const numberOfEmployees = Employees.find({}).count();
  if (!numberOfEmployees) {
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();
      Employees.insert({
        avatar: image.avatar(),
        name,
        email,
        phone,
      });
    });
  }

  Meteor.publish('employees', (PER_PAGE) => (
    Employees.find({}, { limit: PER_PAGE })
  ));
});
