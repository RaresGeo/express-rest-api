const express = require('express');
const rootRouter = express.Router();

const github = require('./github');
const skills = require('./skills');

rootRouter.use('/github', github);
rootRouter.use('/skills', skills);

module.exports = rootRouter;