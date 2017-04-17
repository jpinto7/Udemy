import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/Employees';

Meteor.startup(() => {
  const numberOfEmployees = Employees.find({}).count();
  if (!numberOfEmployees) {
    
  }
});
