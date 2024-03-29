var opentok = require('../tokbox/opentok.js'),
    Promise = require('bluebird'),
    ApiError = require('./apiError.js').ApiError;

function getToken(sessionId, role) {
  return opentok.generateToken({
    sessionId: sessionId,
    role: role
  })
}

function getSessionId() {
  return new Promise(function(resolve, reject) {
    opentok.createSession(null, null, function(sessionId) {
      if (!sessionId) {
        reject(new ApiError('Could not get a valid session ID'));
        return;
      }
      resolve(sessionId);
    });
  });
}

exports.getCredentials = function(sessionId, role) {
  // For now, if no session ID is specified we just create a non-P2P session
  // per request
  return new Promise(function(resolve, reject) {
    if (sessionId) {
      resolve({
        apiKey: opentok.apiKey,
        sessionId: sessionId,
        token: getToken(sessionId, role)
      });
    } else {
      getSessionId().then(function(sessionId) {
        resolve({
          apiKey: opentok.apiKey,
          sessionId: sessionId,
          token: getToken(sessionId, role)
        });
      }).catch(function(e) {
        reject(e);
      });;
    }
  });
};
