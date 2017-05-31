const GAME_STATES = {
    CALCULATION: '_CALCULATIONMODE', // in between calculations.
    START: '_STARTMODE', // Entry point, start the game.
    HELP: '_HELPMODE', // The user is asking for help.
};
const SKILL_NAME = 'Calculator';
const cardContent = `You can ask me things like, what's one plus one point seven. Or what's 
        nine point seven multiplied by hundred and thirty point seven. For more instructions, just say Help.`;
const DEFAULT_DECIMAL_PLACES = 4;
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
    'DivisionOneIntent': function () {
        // handleUserGuess.call(this, false);
        var intent = this.event.request.intent;
        console.log(this.event.request.intent);

        const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value;
        const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10));
        if(answerSlotIsInt){
            var first = parseInt(intent.slots.NumOne.value,10);
            var second = parseInt(intent.slots.NumTwo.value,10);
            let ans = parseFloat(first / second);
            var answerToSpeak = ans;
            if(decimalPlaces(ans)>=DEFAULT_DECIMAL_PLACES)
                answerToSpeak = answerToSpeak.toFixed(DEFAULT_DECIMAL_PLACES);
            // answerToSpeak=answerToSpeak.toFixed(5);
            let speechOutput = `${first} divided by ${second} is ${answerToSpeak}. What do you want me to do next?`;
            Object.assign(this.attributes, {
                speechOutput: speechOutput,
                repromptText:cardContent,
                curAnswer: answerToSpeak,
                history: `${first} divided by ${second}`

            });
            console.log("Division one called");
            console.log(speechOutput);

            this.emit(':askWithCard', speechOutput, cardContent, SKILL_NAME, cardContent); 
        }else{
            this.emitWithState('Unhandled');
        }
// if(answerSlotIsInt){
// 	intent.emit(':tell',`${first} divided by ${second} is $(parseInt(intent.slots.NumOne.value,10)+parseInt(intent.slots.NumTwo.value,10). What do you want me to do next?`);
// }
// else{
// 	intent.emit(':tell',`sorry! I didn't quite get that`);
// }

    },
    'DivisionTwoIntent': function () {
        var intent = this.event.request.intent;
        console.log(this.event.request.intent);

        const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value&&intent.slots.DecOne&&intent.slots.DecOne.value;
        const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10)&&parseInt(intent.slots.DecOne.value));
        if(answerSlotIsInt){
            var first = parseFloat(intent.slots.NumOne.value +'.'+ intent.slots.DecOne.value);
            var second = parseInt(intent.slots.NumTwo.value);
            let ans = parseFloat(first / second);

            var answerToSpeak = ans
            if(decimalPlaces(ans)>=DEFAULT_DECIMAL_PLACES)
                answerToSpeak = answerToSpeak.toFixed(DEFAULT_DECIMAL_PLACES);
            // answerToSpeak=answerToSpeak.toFixed(intent.slots.DecOne.value.length);
            let speechOutput = `${first} divided by ${second} is ${answerToSpeak}. What do you want me to do next?`;
            Object.assign(this.attributes, {
                speechOutput: speechOutput,
                repromptText:cardContent,
                curAnswer: answerToSpeak,
                history: `${first} divided by ${second}`

            });
            console.log("Division two called");
            console.log(speechOutput);
            this.emit(':askWithCard', speechOutput, cardContent, SKILL_NAME, cardContent); 
        }else{
            this.emitWithState('Unhandled');
        }
    },
    'DivisionThreeIntent': function () {
        var intent = this.event.request.intent;
        console.log(this.event.request.intent);

        const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value&&intent.slots.DecOne&&intent.slots.DecOne.value&&intent.slots.DecTwo&&intent.slots.DecTwo.value;
        const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10)&&parseInt(intent.slots.DecOne.value)&&parseInt(intent.slots.DecTwo.value));
        if(answerSlotIsInt){
            var first = parseFloat(intent.slots.NumOne.value +'.'+ intent.slots.DecOne.value);
            var second = parseFloat(intent.slots.NumTwo.value+'.'+intent.slots.DecTwo.value);
            let ans = parseFloat(first / second);


            var answerToSpeak = ans;
            if(decimalPlaces(ans)>=DEFAULT_DECIMAL_PLACES)
                answerToSpeak = answerToSpeak.toFixed(DEFAULT_DECIMAL_PLACES);
            // answerToSpeak=answerToSpeak.toFixed(Math.max(intent.slots.DecOne.value.length,intent.slots.DecTwo.value.length));
            let speechOutput = `${first} divided by ${second} is ${answerToSpeak}. What do you want me to do next?`;
            Object.assign(this.attributes, {
                speechOutput: speechOutput,
                repromptText:cardContent,
                curAnswer: answerToSpeak,
                history: `${first} divided by ${second}`

            });
            console.log("Division three called");
            console.log(speechOutput);
            this.emit(':askWithCard', speechOutput, cardContent, SKILL_NAME, cardContent); 
        }else{
            this.emitWithState('Unhandled');
        }
    },
    'DivisionFourIntent': function () {
        var intent = this.event.request.intent;
        console.log(this.event.request.intent);

        const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value&&intent.slots.DecTwo&&intent.slots.DecTwo.value;
        const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10)&&parseInt(intent.slots.DecTwo.value));
        if(answerSlotIsInt){
            var first = parseFloat(intent.slots.NumOne.value);
            var second = parseFloat(intent.slots.NumTwo.value+'.'+intent.slots.DecTwo.value);
            let ans = parseFloat(first / second);

            var answerToSpeak = ans;
            if(decimalPlaces(ans)>=DEFAULT_DECIMAL_PLACES)
                answerToSpeak = answerToSpeak.toFixed(DEFAULT_DECIMAL_PLACES);
            // answerToSpeak=answerToSpeak.toFixed(intent.slots.DecTwo.value.length);
            let speechOutput = `${first} divided by ${second} is ${answerToSpeak}. What do you want me to do next?`;
            Object.assign(this.attributes, {
                speechOutput: speechOutput,
                repromptText:cardContent,
                curAnswer: answerToSpeak,
                history: `${first} divided by ${second}`

            });
            console.log("Division four called");
            console.log(speechOutput);
            this.emit(':askWithCard', speechOutput, cardContent, SKILL_NAME, cardContent); 
        }else{
            this.emitWithState('Unhandled');
        }
    },
    'DivideAnswerByOne': function(){
        var intent = this.event.request.intent;
        console.log(this.event.request.intent);

        const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value;
        const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10));
        if(answerSlotIsInt){
            var curAnswer = parseFloat(this.attributes.curAnswer);
            var history = this.attributes.history;

            var first = parseFloat(intent.slots.NumOne.value);
            var ans = parseFloat(curAnswer / first);
            var answerToSpeak = ans;
            if(decimalPlaces(ans)>=DEFAULT_DECIMAL_PLACES)
                answerToSpeak = answerToSpeak.toFixed(DEFAULT_DECIMAL_PLACES);
            // answerToSpeak=answerToSpeak.toFixed(decimalPlaces(curAnswer));
            history+= ` divided by ${first}`;
            let speechOutput = `${curAnswer} divided by ${first} is ${answerToSpeak}. What do you want me to do next?`;
            Object.assign(this.attributes, {
                speechOutput: speechOutput,
                repromptText:cardContent,
                curAnswer: answerToSpeak,
                history:history


            });
            console.log("DivideAnswerBy One called");
            console.log(speechOutput);
            this.emit(':askWithCard', speechOutput, cardContent, SKILL_NAME, cardContent); 


        }else{
            this.emitWithState('Unhandled');
        }
    },
    'DivideAnswerByTwo': function(){

        var intent = this.event.request.intent;
        console.log(this.event.request.intent);

        const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value&&intent.slots.DecOne&&intent.slots.DecOne.value;
        const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.DecOne.value));
        if(answerSlotIsInt){
            var curAnswer = parseFloat(this.attributes.curAnswer);
            var history = this.attributes.history;
            var first = parseFloat(intent.slots.NumOne.value+'.'+intent.slots.DecOne.value);
            var ans = parseFloat(curAnswer / first);
            var answerToSpeak = ans;
            if(decimalPlaces(ans)>=DEFAULT_DECIMAL_PLACES)
                answerToSpeak = answerToSpeak.toFixed(DEFAULT_DECIMAL_PLACES);
            // answerToSpeak=answerToSpeak.toFixed(Math.max(decimalPlaces(curAnswer),intent.slots.DecOne.value.length));
            history += ` divided by ${first}`;
            let speechOutput = `${curAnswer} divided by ${first} is ${answerToSpeak}. What do you want me to do next?`;
            Object.assign(this.attributes, {
                speechOutput: speechOutput,
                repromptText:cardContent,
                curAnswer: answerToSpeak,
                history: history

            });
            console.log("DivideAnswerBy Two called");
            console.log(speechOutput);
            this.emit(':askWithCard', speechOutput, cardContent, SKILL_NAME, cardContent); 


        }else{
            this.emitWithState('Unhandled');
        }

    }
}