/**
 * Created by anshu on 23/05/17.
 */
var conflate = require('conflate');
const sub=require('./handlers/subtractionHandlers');
const add = require('./handlers/additionHandlers');
const mult = require('./handlers/multiplicationHandlers');
const div = require('./handlers/divisionHandlers');
const extra = require('./handlers/extraHandlers');
var x = conflate(sub,add,mult,div,extra);
module.exports= x;
