/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
/* eslint-disable no-undef */
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const algoRouter = require('./routes/algo_route.js');
const authRouter = require('./routes/auth_route.js');
const authController = require('./controllers/auth_controller.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../src')));

app.use('/auth', authRouter);

app.use('/algo', algoRouter);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.use((req, res) => {
  console.log('404', req.url);
  res.status(404).send('This is not the page you are looking for...');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
