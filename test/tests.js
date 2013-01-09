var should = require('should');
var example = require('../src/index');

describe("reverseTwice", function() {

  it("should reverse its input string and return it concatenated with itself", function() {
    example.reverseTwice('foobar').should.eql('raboofraboof');
  });

  it("should work for numbers too", function() {
    example.reverseTwice(12).should.eql('2121');
  });

});
