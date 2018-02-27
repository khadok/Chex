var Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.411fe405-8253-4d39-b13b-92d526ae6cd5';
var expensive = ["cars","cigarettes","cigar","tobacco","restaurant","flights","clothes","gold","silver","jwellery","mineral water","plastic bags","e-reader","golf cars","lottery","lawyers"]
var cheap = ["footwear","solar lamp","router","modem","microwave","ovens","saitary pads","tampons","dialyser"]

var handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', 'Hi! What to know if an item got expensive or cheaper since the Union budget? Simply ask! For example, say footwear cheap or expensive');
  },
  'GetChange': function () {
    var answerSlotFilled = this.event.request.intent && this.event.request.intent.slots && this.event.request.intent.slots.item && this.event.request.intent.slots.item.value;
    if(!answerSlotFilled){
      this.emit(':ask', 'Please include an item in your request');
    }
        
    var itemRequested = this.event.request.intent.slots.item.value.toLowerCase() ;
    
    if(expensive.indexOf(itemRequested)>-1){
      this.emit(':tell', itemRequested+ " has become expensive since last Union budget");
    }
    else if(cheap.indexOf(itemRequested)>-1){
      this.emit(':tell', itemRequested+ " has become cheaper since last Union budget");
    }
    else
      this.emit(':tell', 'No chnage for '+ itemRequested+' has happened in this Union budget');
  },
  'Unhandled': function () {
    this.emit(':ask', 'Seems like I didn\'t understand you');
  },
  'AMAZON.HelpIntent': function () {
      this.emit(':ask', "Ask if an item became expensive or cheap since last Union budget. For example, say footwear cheap or expensive");
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', "Okay!");
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', "Stay up-to-date with the budget. Goodbye!");
  },
};

exports.handler = function(event, context){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};