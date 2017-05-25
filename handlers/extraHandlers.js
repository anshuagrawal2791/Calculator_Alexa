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

    'ReadHistoryIntent': function(){

        var intent = this.event.request.intent;
        console.log(this.event.request.intent);

            var curAnswer = parseFloat(this.attributes.curAnswer);
            var history = this.attributes.history;

            let speechOutput = `Ok. You have done ${history}. What do you want me to do next?`;
            Object.assign(this.attributes, {
                speechOutput: speechOutput,
                speechOutput,
                curAnswer: curAnswer,
                history: history

            });
            console.log("Read History Intent called");
            console.log(speechOutput);
            this.emit(':askWithCard', speechOutput);
    }
}