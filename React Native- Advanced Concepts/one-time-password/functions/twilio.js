const twilio = require('twilio');

const accountSid = 'AC9fa87112264f9015e35328044c917414';
const authToken = '06d3e9f2f5c5d216f7de1b9cee154ac5';

module.exports = new twilio(accountSid, authToken);
