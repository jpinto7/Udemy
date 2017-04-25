import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';
import { Links } from '../imports/collections/links';

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

function onRoute(req, res, next) {
  const { params: { token } } = req;
  const link = Links.findOne({ token });
  if (link) {
    Links.update(link, { $inc: { clicks: 1 } });
    res.writeHead(307, { Location: link.url });
    res.end();
  }
  next();
}

const middleware = ConnectRoute((router) => {
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);
