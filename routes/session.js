var api = require('../api/session.js');

exports.getCredentials = function(req, res) {
  api.getCredentials().then(function(credentials) {
    res.json(200, credentials);
  }).catch(function(error) {
    res.send(500, error);
  });
};
