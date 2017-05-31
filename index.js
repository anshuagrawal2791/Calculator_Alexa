'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.ebbe8c85-74ed-4bd9-b068-e89ae866e50f'; 
const additionHandlers = require('./handlers/additionHandlers');
const SKILL_NAME = 'Calculator';
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
            this.handler.state = GAME_STATES.CALCULATION;
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
        console.log("start game called");
        let speechOutput = newGame ? `Welcome to ${SKILL_NAME}. `+`You can ask me things like, what's one plus one point seven. Or what's 
        nine point seven multiplied by hundred and thirty point seven. For more instructions, just say Help.`: 'OK. output is set to 0. What do you want me to do next?';
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
        let cardContent = `Welcome to ${SKILL_NAME}. `+`You can ask me things like, what's one plus one point seven. Or what's 
        nine point seven multiplied by hundred and thirty point seven. For more instructions, just say Help.`;
    	// else
    	// 	let repromptText = `Take your time`;
        // for (let i = 0; i < ANSWER_COUNT; i += 1) {
        //     repromptText += `${(i + 1).toString()}. ${roundAnswers[i]}. `;
        // }

        // speechOutput += repromptText;
        console.log(additionHandlers.handler);
        Object.assign(this.attributes, {
            speechOutput: speechOutput,
            repromptText,
            curAnswer: 0,
            history:''
        });

        // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
        this.handler.state = GAME_STATES.CALCULATION;

        this.emit(':askWithCard', speechOutput, cardContent, SKILL_NAME, cardContent);
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState('helpTheUser', true);
    },
    'Unhandled': function () {
        this.emit('StartGame', true);
    },'AMAZON.StopIntent': function () {
        const speechOutput = 'Ok. Goodbye!';
        this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        const speechOutput = 'Ok. Goodbye!';
        this.emit(':tell', speechOutput);
    },
    'SessionEndedRequest': function () {
        const speechOutput = 'OK, Goodbye!';
        this.emit(':tell', speechOutput);
    }
});

const calculationStateHandlers = createStateHandler(GAME_STATES.CALCULATION,require('./handlersConflater'));
const helpStateHandlers = createStateHandler(GAME_STATES.HELP, {
    'helpTheUser': function (newGame) {
        // const askMessage = newGame ? 'Would you like to start playing?' : 'To repeat the last question, say, repeat. Would you like to keep playing?';
        const speechOutput = `Hi there. I'll help you with your calculations. `
        + `For example, you can ask me, what's two point three multiplied by seven point nine. ` +`I'll also keep the last output so that you can operate on it. For example, you can ask me to multiply nine to the answer. `+ `I'll also record the calculations so you can recheck. Just say, tell me the calculation history. Shall we start?`;
        const repromptText = `Shall we start?`;

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
        
            this.handler.state = GAME_STATES.START;
            this.emitWithState('StartGame', false);
        
    },
    'AMAZON.NoIntent': function () {
        const speechOutput = 'Ok. Goodbye!';
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        const speechOutput = 'Would you like to keep playing?';
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        const speechOutput = 'Would you like to keep playing?';
        this.emit(':ask', speechOutput, speechOutput);
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
