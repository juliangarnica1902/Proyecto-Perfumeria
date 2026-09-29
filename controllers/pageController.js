const path = require('path');
const view = (name) => (req, res) => res.sendFile(path.join(__dirname, '../views', name));
module.exports = {
  home: view('index.html'),
  productDetail: view('productDetail.html'),
  cart: view('productCart.html'),
  register: view('register.html'),
  login: view('login.html'),
};
