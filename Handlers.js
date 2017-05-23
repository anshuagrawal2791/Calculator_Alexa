/**
 * Created by anshu on 23/05/17.
 */
var conflate = require('conflate');
const sub=require('./subtractionHandlers');
const add = require('./additionHandlers');
var x = conflate(sub,add);
module.exports= x;
