const express = require('express');
const authRoute = require('./v1/authRoutes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/v1/auth',
    route: authRoute,
  }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;