var expect = chai.expect;
var target = document.getElementById("test")
var element = new Transformer(target);

describe("Transformer", function() {
  describe("constructor", function() {
    it("should load DOM element into objects 'el' property", function() {
      expect(element.el).to.equal(target);
    });
  });

  describe("functions", function() {
    describe("CreateUserDefinedFunction", function() {
      it("shorthand 'createUDF'  available", function() {
        expect(element.createUDF).to.equal(element.createUserDefinedFunction);
      });
      it("return a new function", function() {
        console.log(typeof element.createUDF("test",function(){}))
        expect(element.createUDF("test",function(){}).prototype).to.be.function;
      });
      it("Error when invalid arguments are passed", function() {
        console.log(typeof element.createUDF("test",function(){}))
        expect(element.createUDF("test",function(){}).prototype).to.error;
      });
    });
  });
});
