let cookies = require('cookies-js');

cookies.defaults = { path: '/' };
window.cookies = cookies;

export default cookies;