import 'babel-polyfill';
import fs from 'fs';
import {resolve} from 'path';
import ejs from 'ejs';
import restify from 'restify';
import cookieParser from 'restify-cookies';
import serveStatic from 'serve-static-restify';
import validator from 'restify-joi-middleware';
import React from "react";
import { renderToString } from "react-dom/server";
import ExamplePage from '../shared/components/example/index';

const jsdom = require("jsdom");

const assetsPath = resolve(__dirname, '../../build/webpack-assets.json');
const templatePath = resolve(__dirname, '../../src/shared/template/index.ejs');
const PORT = process.env.PORT || 3050;

const renderString = async (filename, data, options)=> new Promise((resolve, reject) => {
    ejs.renderFile(filename, data, options, (err, str) => {
      if (err !== null) return reject(err);
      return resolve(str);
    });
});

const server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(cookieParser.parse);
server.use(validator());

server.pre(serveStatic(resolve(__dirname,'../../build/')));

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
    const page = renderToString(<ExamplePage/>);
    let render = await renderString(templatePath, {
      htmlWebpackPlugin: {
        options: {
          render: page
        }
      }
    });

    if (fs.existsSync(assetsPath)) {
      const webpackAssets = JSON.parse(fs.readFileSync(assetsPath));
      const scripts = Object.keys(webpackAssets).sort().map((entry)=>`<script src="${ webpackAssets[entry].js }"></script>`).join('');
      render = render.replace('</body>',`${scripts}</body>`);
    }
    res.status(200);
    res.write(render);
    res.end();
    return next();
});

(async () => {
  try {
    server.listen(PORT);
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
})();
