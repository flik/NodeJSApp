
'use strict';
var test = require('unit.js');
var er = require('../')
describe('error-render', function(){
it('should detail the error', function(){
test
.string(er.details(new Error('Whoops')))
.contains('Error')
.contains('Whoops')
.contains('Metadata:')
.contains('stack:')
.contains('Error: Whoops')
.contains(' at Context.<anonymous>')
.contains('message:')
;
});
it('should display the error in the console', function(){
var called = false;
test
.when(function(){
console.error = function(value) {
called = true;
test
.string(value)
.contains('Error')
.contains('Whoops')
.contains('Metadata:')
.contains('stack:')
.contains('Error: Whoops')
.contains(' at Context.<anonymous>')
.contains('message:')
;
};
})
.then(function(){
test
.undefined(er.log(new Error('Whoops')))
.bool(called)
.isTrue()
;
})
});
it('should be able prettify the JSON', function(){
test
.function(er.prettyJson)
.string(er.prettyJson({foo: 'bar'}))
.contains('foo:')
.contains('bar')
;
});
it('should expose the pretty-error module', function(){
test.function(er.PrettyError)
.is(require('pretty-error'));
});
});
