var helpers = require('./helpers');


exports.reverseTwice = function(str) {
  if (str === null) {
    return null;
  }
  var reversed = helpers.reverseString(str.toString());
  return reversed + reversed;
};


exports.sqrt = function(a) {
  var limit = 0.00001;
  var step = function(x) {
    if (Math.abs(x - a / x) < limit)
      return x;
    return step((x + a / x) / 2);
  };
  return step(a/2);
};
