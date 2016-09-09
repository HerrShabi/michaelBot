# Michael Bot for Slack

## Motivation
You are bored, your life is misreable, you need a bot to make you laugh.

## Installation

```bashp
cd michaelBot
```

```bashp
npm install
```

```bashp
node michaelRunner.js
```

## How to setup the bot.
1. Create a slack api webhook and define the bot
2. Take the slack channel web hook and save it in process.env.SLACK_WEBHOOK_URL.
3. Get a slack token and save it in: process.env.SLACK_API_TOKEN
4. Get the channel id you want to post the TWSS messages there and store here: process.env.SLACK_CHANNEL_ID
5. Run the app

