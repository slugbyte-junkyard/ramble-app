'use strict';

const Router = require('express').Router;
const debug = require('debug')('ramble:auth-router');
const jsonParser = require('body-parser').json();
const parseBasicAuth = require('../lib/parse-basic-auth');

const authController = require('../controller/auth-controller');

const authRouter = module.exports = new Router();
debug('authRouter');
authRouter.post('/signup', jsonParser, function(req, res, next){
  authController.signup(req.body)
  .then(token => res.send(token))
  .catch(next);
});

authRouter.get('/signin', parseBasicAuth, function(req, res, next){
  console.log('req.auth', req.auth);
  authController.signin(req.auth)
  .then(token => res.send(token))
  .catch(next);
});

authRouter.put('/update/password', jsonParser, function(req, res, next){
  authController.updatePassword(req.body)
  .then(token => res.send(token))
  .catch(next);
});

authRouter.delete('/delete', function(req, res, next){
  authController.deleteUser(req.auth)
  .then(() => res.status(204).end())
  .catch(next);
});
