const GAME_STATES = {
    CALCULATION: '_CALCULATIONMODE', // in between calculations.
    START: '_STARTMODE', // Entry point, start the game.
    HELP: '_HELPMODE', // The user is asking for help.
};
function decimalPlaces(num) {
	var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	if (!match) { return 0; }
	return Math.max(
		0,
		// Number of digits right of decimal point.
		(match[1] ? match[1].length : 0)
		// Adjust for scientific notation.
		- (match[2] ? +match[2] : 0));
}
module.exports =
{
	'AdditionOneIntent': function () {
    // handleUserGuess.call(this, false);
    var intent = this.event.request.intent;
		console.log(this.event.request.intent);
    const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value;
    const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10));
    if(answerSlotIsInt){
    	var first = parseInt(intent.slots.NumOne.value,10);
    	var second = parseInt(intent.slots.NumTwo.value,10);
    	let ans = first + second;
    	var answerToSpeak = ans;
    	answerToSpeak=answerToSpeak.toFixed();
    	let speechOutput = `${first} plus ${second} is ${answerToSpeak}. What do you want me to do next?`;
    	Object.assign(this.attributes, {
    		speechOutput: speechOutput,
    		speechOutput,
    		curAnswer: answerToSpeak,
    		history: `${first} plus ${second}`

    	});
    	console.log("addition one called");
    	console.log(speechOutput);

    	this.emit(':askWithCard', speechOutput);
    }else{
    	this.emitWithState('Unhandled');
    }
// if(answerSlotIsInt){
// 	intent.emit(':tell',`${first} plus ${second} is $(parseInt(intent.slots.NumOne.value,10)+parseInt(intent.slots.NumTwo.value,10). What do you want me to do next?`);
// }
// else{
// 	intent.emit(':tell',`sorry! I didn't quite get that`);
// }

},
'AdditionTwoIntent': function () {
	var intent = this.event.request.intent;
	console.log(this.event.request.intent);

	const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value&&intent.slots.DecOne&&intent.slots.DecOne.value;
	const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10)&&parseInt(intent.slots.DecOne.value));
	if(answerSlotIsInt){
		var first = parseFloat(intent.slots.NumOne.value +'.'+ intent.slots.DecOne.value);
		var second = parseInt(intent.slots.NumTwo.value);
		let ans = parseFloat(first+second);

		var answerToSpeak = ans
		answerToSpeak=answerToSpeak.toFixed(intent.slots.DecOne.value.length);
		let speechOutput = `${first} plus ${second} is ${answerToSpeak}. What do you want me to do next?`;
		Object.assign(this.attributes, {
			speechOutput: speechOutput,
			speechOutput,
			curAnswer: answerToSpeak,
			history: `${first} plus ${second}`

		});
		console.log("addition two called");
		console.log(speechOutput);
		this.emit(':askWithCard', speechOutput);
	}else{
		this.emitWithState('Unhandled');
	}
},
'AdditionThreeIntent': function () {
	var intent = this.event.request.intent;
	console.log(this.event.request.intent);

	const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value&&intent.slots.DecOne&&intent.slots.DecOne.value&&intent.slots.DecTwo&&intent.slots.DecTwo.value;
	const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10)&&parseInt(intent.slots.DecOne.value)&&parseInt(intent.slots.DecTwo.value));
	if(answerSlotIsInt){
		var first = parseFloat(intent.slots.NumOne.value +'.'+ intent.slots.DecOne.value);
		var second = parseFloat(intent.slots.NumTwo.value+'.'+intent.slots.DecTwo.value);
		let ans = parseFloat(first + second);


		var answerToSpeak = ans;
		answerToSpeak=answerToSpeak.toFixed(Math.max(intent.slots.DecOne.value.length,intent.slots.DecTwo.value.length));
		let speechOutput = `${first} plus ${second} is ${answerToSpeak}. What do you want me to do next?`;
		Object.assign(this.attributes, {
			speechOutput: speechOutput,
			speechOutput,
			curAnswer: answerToSpeak,
			history: `${first} plus ${second}`

		});
		console.log("addition three called");
		console.log(speechOutput);
		this.emit(':askWithCard', speechOutput);
	}else{
		this.emitWithState('Unhandled');
	}  
},
'AdditionFourIntent': function () {
	var intent = this.event.request.intent;
	console.log(this.event.request.intent);

	const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value&&intent.slots.DecTwo&&intent.slots.DecTwo.value;
	const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10)&&parseInt(intent.slots.DecTwo.value));
	if(answerSlotIsInt){
		var first = parseFloat(intent.slots.NumOne.value);
		var second = parseFloat(intent.slots.NumTwo.value+'.'+intent.slots.DecTwo.value);
		let ans = parseFloat(first+second);

		var answerToSpeak = ans;
		answerToSpeak=answerToSpeak.toFixed(intent.slots.DecTwo.value.length);
		let speechOutput = `${first} plus ${second} is ${answerToSpeak}. What do you want me to do next?`;
		Object.assign(this.attributes, {
			speechOutput: speechOutput,
			speechOutput,
			curAnswer: answerToSpeak,
			history: `${first} plus ${second}`

		});
		console.log("addition four called");
		console.log(speechOutput);
		this.emit(':askWithCard', speechOutput);
	}else{
		this.emitWithState('Unhandled');
	}   
},
'AddToAnswerOne': function(){
	var intent = this.event.request.intent;
	console.log(this.event.request.intent);

	const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value;
	const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10));
	if(answerSlotIsInt){
		var curAnswer = parseFloat(this.attributes.curAnswer);
		var history = this.attributes.history;

		var first = parseFloat(intent.slots.NumOne.value);
		var ans = parseFloat(curAnswer + first);
		var answerToSpeak = ans;
		answerToSpeak=answerToSpeak.toFixed(decimalPlaces(curAnswer));
		history+= ` plus ${first}`;
		let speechOutput = `${curAnswer} plus ${first} is ${answerToSpeak}. What do you want me to do next?`;
		Object.assign(this.attributes, {
			speechOutput: speechOutput,
			speechOutput,
			curAnswer: answerToSpeak,
			history:history


		});
		console.log("addToAnswer One called");
		console.log(speechOutput);
		this.emit(':askWithCard', speechOutput);


	}else{
		this.emitWithState('Unhandled');
	}
},
'AddToAnswerTwo': function(){

	var intent = this.event.request.intent;
	console.log(this.event.request.intent);

	const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value&&intent.slots.DecOne&&intent.slots.DecOne.value;
	const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.DecOne.value));
	if(answerSlotIsInt){
		var curAnswer = parseFloat(this.attributes.curAnswer);
		var history = this.attributes.history;
		var first = parseFloat(intent.slots.NumOne.value+'.'+intent.slots.DecOne.value);
		var ans = parseFloat(curAnswer + first);
		var answerToSpeak = ans;
		answerToSpeak=answerToSpeak.toFixed(Math.max(decimalPlaces(curAnswer),intent.slots.DecOne.value.length));
		history += ` plus ${first}`;
		let speechOutput = `${curAnswer} plus ${first} is ${answerToSpeak}. What do you want me to do next?`;
		Object.assign(this.attributes, {
			speechOutput: speechOutput,
			speechOutput,
			curAnswer: answerToSpeak,
			history: history

		});
		console.log("addToAnswer Two called");
		console.log(speechOutput);
		this.emit(':askWithCard', speechOutput);


	}else{
		this.emitWithState('Unhandled');
	}

},
'AMAZON.StartOverIntent': function () {
	this.handler.state = GAME_STATES.START;
	this.emitWithState('StartGame', false);
},
'AMAZON.RepeatIntent': function () {
	this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptText);
},
'AMAZON.HelpIntent': function () {
	this.handler.state = GAME_STATES.HELP;
	this.emitWithState('helpTheUser', false);
},
'AMAZON.StopIntent': function () {
    // this.handler.state = GAME_STATES.HELP;
    // const speechOutput = 'Ending calculator';
    this.emitWithState('AMAZON.SessionEndedRequest');
},
// 'AMAZON.YesIntent': function () {
//     if (this.attributes.speechOutput && this.attributes.repromptText) {
//         this.handler.state = GAME_STATES.CALCULATION;
//         this.emitWithState('AMAZON.RepeatIntent');
//     } else {
//         this.handler.state = GAME_STATES.START;
//         this.emitWithState('StartGame', false);
//     }
// },
'AMAZON.CancelIntent': function () {
	this.emit(':tell', 'Ok, let\'s play again soon.');
},
'Unhandled': function () {
	console.log("UNHANDLED");
	console.log(this.event.request.intent);
	var curAnswer = parseFloat(this.attributes.curAnswer);
	var history = this.attributes.history;
	let speechOutput = `Sorry! I didn't understand what you said`;
	Object.assign(this.attributes, {
		speechOutput: speechOutput,
		speechOutput,
		curAnswer: answerToSpeak,
		history: history

	});
	// console.log("MultiplyByAnswer Two called");
	console.log(speechOutput);
	this.emit(':askWithCard', speechOutput);
},
'AMAZON.SessionEndedRequest': function () {
	const speechOutput = 'OK, Goodbye!';
	this.handler.state = GAME_STATES.START;
	this.emit(':tell', speechOutput);
}
}