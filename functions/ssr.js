require('zone.js/dist/zone-node');

const express = require('express');
const fs = require('fs');
const path = require('path');
const { enableProdMode } = require('@angular/core');
const { renderModuleFactory } = require('@angular/platform-server');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

const DIST_FOLDER = [__dirname, 'pwa'];
const INDEX = ['pwa', 'index.html'];
const MAIN = ['pwa-server', 'main'];
const document = fs.readFileSync(path.join(...DIST_FOLDER.concat(INDEX)), { encoding: 'utf8' }).toString();
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
} = require(DIST_FOLDER.concat(MAIN).join('/'));

enableProdMode();

const app = express();

app.get('**', (req, res) => {
  const reportError = err => {
    console.error('SSR Failed:', err);
    res.status(500).send(err);
  };
  const url = req.path;
  console.log(`Handling request for URL '${url}'`);
  try {
    const options = {
      document,
      url,
      extraProviders: [provideModuleMap(LAZY_MODULE_MAP)],
    };
    renderModuleFactory(AppServerModuleNgFactory, options)
      .then(html => {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.send(html);

        return Promise.resolve();
      })
      .catch(reportError);
  } catch (error) {
    reportError(error);
  }
});
module.exports.app = app;
