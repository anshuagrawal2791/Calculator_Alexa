'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.ebbe8c85-74ed-4bd9-b068-e89ae866e50f'; 
const SKILL_NAME = 'Calculator'
const GAME_STATES = {
    CALCULATION: '_CALCULATIONMODE', // in between calculations.
    START: '_STARTMODE', // Entry point, start the game.
    HELP: '_HELPMODE', // The user is asking for help.
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(newSessionHandlers,startStateHandlers,calculationStateHandlers,helpStateHandlers);
    alexa.execute();
};

const newSessionHandlers = {
    /**
     * Entry point. Start a new game on new session. Handle any setup logic here.
     */
    'NewSession': function () {
        this.handler.state = GAME_STATES.START;
        if (this.event.request.type === 'LaunchRequest') {
            this.emitWithState('StartGame', true);
        } else if (this.event.request.type === 'IntentRequest') {
            console.log(`current intent: ${this.event.request.intent.name
                }, current state:${this.handler.state}`);
            const intent = this.event.request.intent.name;
            this.emitWithState(intent);
        }
    },

    'SessionEndedRequest': function () {
        const speechOutput = 'OK, Goodbye!';
        this.emit(':tell', speechOutput);
    },
};
const createStateHandler = Alexa.CreateStateHandler;

const startStateHandlers = createStateHandler(GAME_STATES.START, {
    'StartGame': function (newGame) {
        let speechOutput = newGame ? `Welcome to ${SKILL_NAME}`: 'output is 0';
        // Select GAME_LENGTH questions for the game
        // const gameQuestions = populateGameQuestions();
        // // Generate a random index for the correct answer, from 0 to 3
        // const correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
        // // Select and shuffle the answers for each question
        // const roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex);
        // const currentQuestionIndex = 0;
        // const spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
        // if(newGame)
        	let repromptText = `Current answer is 0`;
    	// else
    	// 	let repromptText = `Take your time`;

        // for (let i = 0; i < ANSWER_COUNT; i += 1) {
        //     repromptText += `${(i + 1).toString()}. ${roundAnswers[i]}. `;
        // }

        // speechOutput += repromptText;

        Object.assign(this.attributes, {
            speechOutput: speechOutput,
            repromptText,
            curAnswer: 0
        });

        // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
        this.handler.state = GAME_STATES.CALCULATION;

        this.emit(':askWithCard', speechOutput, repromptText, SKILL_NAME, repromptText);
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState('helpTheUser', true);
    },
    'Unhandled': function () {
        this.emit('StartGame', true);
    },
    'SessionEndedRequest': function () {
        const speechOutput = 'OK, Goodbye!';
        this.emit(':tell', speechOutput);
    },
});

const calculationStateHandlers = createStateHandler(GAME_STATES.CALCULATION, {
    'AdditionOneIntent': function () {
        // handleUserGuess.call(this, false);
    var intent = this.event.request.intent;
    const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value;
    const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10));
    let ans = parseInt(intent.slots.NumOne.value,10)+parseInt(intent.slots.NumTwo.value,10)

     let speechOutput = `answer is ${ans}. What do you want me to do next?`;
     Object.assign(this.attributes, {
            speechOutput: speechOutput,
            speechOutput,
            curAnswer: ans,
           
        });
     this.emit(':askWithCard', speechOutput);

    // if(answerSlotIsInt){
    // 	intent.emit(':tell',`answer is $(parseInt(intent.slots.NumOne.value,10)+parseInt(intent.slots.NumTwo.value,10). What do you want me to do next?`);
    // }
    // else{
    // 	intent.emit(':tell',`sorry! I didn't quite get that`);
    // }

    },
    'AdditionTwoIntent': function () {
        var intent = this.event.request.intent;
    const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value;
    const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10));
    let ans = parseFloat(parseFloat(intent.slots.NumOne.value +'.'+ intent.slots.DecOne.value)+parseInt(intent.slots.NumTwo.value));

     let speechOutput = `answer is ${ans}. What do you want me to do next?`;
     Object.assign(this.attributes, {
            speechOutput: speechOutput,
            speechOutput,
            curAnswer: ans,
           
        });
     this.emit(':askWithCard', speechOutput);
    },
    'AdditionThreeIntent': function () {
    	var intent = this.event.request.intent;
    // const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value;
    // const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10));
    let ans = parseFloat(parseFloat(intent.slots.NumOne.value +'.'+ intent.slots.DecOne.value)+parseFloat(intent.slots.NumTwo.value+'.'+intent.slots.DecTwo.value));

     let speechOutput = `answer is ${ans}. What do you want me to do next?`;
     Object.assign(this.attributes, {
            speechOutput: speechOutput,
            speechOutput,
            curAnswer: ans,
           
        });
     this.emit(':askWithCard', speechOutput);
        
    },
    'AdditionFourIntent': function () {
        var intent = this.event.request.intent;
    // const answerSlotFilled = intent && intent.slots && intent.slots.NumOne && intent.slots.NumOne.value && intent.slots.NumTwo && intent.slots.NumTwo.value;
    // const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.NumOne.value, 10)&&parseInt(intent.slots.NumTwo.value,10));
    let ans = parseFloat(parseFloat(intent.slots.NumOne.value)+parseFloat(intent.slots.NumTwo.value+'.'+intent.slots.DecTwo.value));

     let speechOutput = `answer is ${ans}. What do you want me to do next?`;
     Object.assign(this.attributes, {
            speechOutput: speechOutput,
            speechOutput,
            curAnswer: ans,
           
        });
     this.emit(':askWithCard', speechOutput);
        
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
        // this.handler.state = GAME_STATES.START;
        // this.emitWithState('StartGame', false);
    },
    'SessionEndedRequest': function () {
        const speechOutput = 'OK, Goodbye!';
        this.handler.state = GAME_STATES.START;
        this.emit(':tell', speechOutput);
    },
});
const helpStateHandlers = createStateHandler(GAME_STATES.HELP, {
    'helpTheUser': function (newGame) {
        const askMessage = newGame ? 'Would you like to start playing?' : 'To repeat the last question, say, repeat. Would you like to keep playing?';
        const speechOutput = `I will ask you multiple choice questions. Respond with the number of the answer. `
            + `For example, say one, two, three, or four. To start a new game at any time, say, start game. ${askMessage}`;
        const repromptText = `To give an answer to a question, respond with the number of the answer . ${askMessage}`;

        this.emit(':ask', speechOutput, repromptText);
    },
    'StartGame': function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState('StartGame', false);
    },
    'AMAZON.RepeatIntent': function () {
        this.emitWithState('helpTheUser');
    },
    'AMAZON.HelpIntent': function () {
        this.emitWithState('helpTheUser', false);
    },
    'AMAZON.YesIntent': function () {
        if (this.attributes.speechOutput && this.attributes.repromptText) {
            this.handler.state = GAME_STATES.CALCULATION;
            this.emitWithState('AMAZON.RepeatIntent');
        } else {
            this.handler.state = GAME_STATES.START;
            this.emitWithState('StartGame', false);
        }
    },
    'AMAZON.NoIntent': function () {
        const speechOutput = 'Ok, we\'ll play another time. Goodbye!';
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        const speechOutput = 'Would you like to keep playing?';
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.handler.state = GAME_STATES.CALCULATION;
        this.emitWithState('AMAZON.RepeatIntent');
    },
    'Unhandled': function () {
        const speechOutput = 'Say yes to continue, or no to end the game.';
        this.emit(':ask', speechOutput, speechOutput);
    },
    'SessionEndedRequest': function () {
        const speechOutput = 'OK, Goodbye!';
        this.emit(':tell', speechOutput);
    },
});