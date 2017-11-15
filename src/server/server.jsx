import 'babel-polyfill';
import restify from 'restify';
import cookieParser from 'restify-cookies';
import validator from 'restify-joi-middleware';
import React from "react";
import { hydrate } from "react-dom";
import ExamplePage from '../shared/components/example/index';

const PORT = process.env.PORT || 3050;
const server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(cookieParser.parse);
server.use(validator());

server.pre((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Request-Method, X-Requested-With, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.charSet('utf-8');
  return next();
});

server.get({
  path: '/',
  name: 'Get articles',
  },  async (req, res, next) => {

    res.status(200);
    res.send(hydrate(<ExamplePage/>, document.getElementById("content")));
    return next();
});

(async () => {
  try {
    server.listen(PORT);
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
})();
