var express = require('express');
const port = process.env.PORT || 4567;
const app = express();

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function returnSuccess(req, res) {
  console.log('URL', req.originalUrl, ' - Status: 200');
  res.sendStatus(200);
}

function noop(req) {
  console.log('URL', req.originalUrl, ' - Status: Noop');
}

function returnNotFound(req, res) {
  console.log('URL', req.originalUrl, ' - Status: 404');
  res.sendStatus(404)
}

function returnSuccessWithTimeout(req, res) {
  console.log('URL', req.originalUrl, ' - Delay');
  setTimeout(returnSuccess, 1000, req, res);
}

/**
 * 
 * The getRandomInt function gives the same chance for all the numbers in the defined range.
 * Therefore, doing the module of each number with all possible (1 to 20),
 * we have the following probability of this module being zero:
 *
 * num - Prob. - Module equal 0
 *  1  - 100%  - [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
 *  2  -  50%  - [2,4,6,8,10,12,14,16,18,20]
 *  3  -  30%  - [3,6,9,12,15,18]
 *  4  -  25%  - [4,8,12,16,20]
 *  5  -  20%  - [5,10,15,20]
 *  6  -  15%  - [6,12,18]
 *  7  -  10%  - [7,14]
 *  8  -  10%  - [8,16]
 *  9  -  10%  - [9,18]
 * 10  -  10%  - [10,20]
 * 11  -   5%  - [11]
 * 12  -   5%  - [12]
 * 13  -   5%  - [13]
 * 14  -   5%  - [14]
 * 15  -   5%  - [15]
 * 16  -   5%  - [16]
 * 17  -   5%  - [17]
 * 18  -   5%  - [18]
 * 19  -   5%  - [19]
 * 20  -   5%  - [20]
 *
 * @param { Number } random 
 * @returns { Function }
 */
function getRandomCallback(random) {
  const callbacks = {
    10: returnNotFound, // 10%
    15: noop, // 5%
    20: returnSuccessWithTimeout // 5%
  };
  return callbacks[random] || returnSuccess;
}

app.use((req, res) => getRandomCallback(getRandomInt(1, 20))(req, res));

app.listen(process.env.PORT || 4567, function () {
  console.log(`Server listening on port ${port}!`);
});
