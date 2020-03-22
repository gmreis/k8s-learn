var express = require('express');

const bodyParser = require('body-parser');
const schemaValid = require('./schemaValid');
const urlStatusValid = require('./urlStatusValid');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/product/valid', schemaValid, urlStatusValid);

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
