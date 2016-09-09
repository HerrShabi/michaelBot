require ('./twss/unrepeat');
require ('./twss/tokenize');
require ('./twss/stop');
require ('./twss/stem');
require ('./twss/bigram');


var IncomingWebhook = require('@slack/client').IncomingWebhook;

var channel = {
	channelWebHook: process.env.SLACK_WEBHOOK_URL || '',
	channelId: process.env.SLACK_CHANNEL_ID || ''
};

var wh = new IncomingWebhook(channel.channelWebHook);
var whWithDefaults = new IncomingWebhook(channel.channelWebHook, {
  username: 'MichaelScottBot',
  iconEmoji: ':robot_face:',
  channel: 'team-alex'
});

var natural = require ('natural');
var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var token = process.env.SLACK_API_TOKEN || '';
var threshold = parseFloat(process.env.THRESHOLD || 9);

var rtm = new RtmClient(token, { logLevel: 'debug' });
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
	if (message.channel === channel.channelId && message.type === 'message') {
		natural.BayesClassifier.load('./twss/classifier-twss.json', null, function(err, classifier) {
		var c = classifier.getClassifications(message.text);
        var cmp = {};
        cmp[c[0].label] = c[0].value;
        cmp[c[1].label] = c[1].value;
        var perc = cmp['positive']/cmp['negative'];

      if (perc > threshold) {
      	wh.send('That\'s what she said');
      }
	});
	}
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
  //console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
  //console.log('Reaction removed:', reaction);
});
