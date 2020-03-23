const axios = require('axios');

function checkUrlStatus(url) {
  return axios.get(url, { timeout: 2000 })
    .catch(error => error && error.response)
    .then(response => response && response.status || 'timeout');
}

module.exports = function (req, res) {
  const product = req.body;
  const productUrlPromise = checkUrlStatus(product.url).then(status => ({ key: 'productUrl', url: product.url, status }));
  const promises = Object.keys(product.images).map((imageKey) => {
    return checkUrlStatus(product.images[imageKey])
      .then(status => ({ key: imageKey, url: product.images[imageKey], status }));
  });

  promises.push(productUrlPromise)
  Promise.all(promises)
    .then((statusList) => {
      const isAllSucessStatus = statusList.every(url => url && url.status === 200);
      const response = isAllSucessStatus ? { status: 'ok' } : { status: 'error', urlStatus: statusList };
      res.json(response);
    });
}
