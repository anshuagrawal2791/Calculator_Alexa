/**
 * Created by anshu on 23/05/17.
 */
var conflate = require('conflate');
const sub=require('./subtractionHandlers');
const add = require('./additionHandlers');
const mult = require('./multiplicationHandlers');
var x = conflate(sub,add,mult);
module.exports= x;
