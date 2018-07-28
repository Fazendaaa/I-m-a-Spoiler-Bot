# I'm a Spoiler Bot

<div align = "center">
<br>
<img src="./others/img/logo/logo.png" height=260>
<br>
<br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](./README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./docs/readme/README_PT.md)

[![Build Status](https://img.shields.io/travis/Fazendaaa/I-m-a-Spoiler-Bot.svg?style=flat-square)](https://travis-ci.org/Fazendaaa/I-m-a-Spoiler-Bot)
[![codecov](https://img.shields.io/codecov/c/github/Fazendaaa/I-m-a-Spoiler-Bot.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/I-m-a-Spoiler-Bot)
[![Dependencies](https://david-dm.org/Fazendaaa/I-m-a-Spoiler-Bot.svg?style=flat-square)](https://codeclimate.com/github/Fazendaaa/I-m-a-Spoiler-Bot/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/fazendaaa/podsearch_bot/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fazendaaa/podsearch_bot?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c38351e2ca7bd3a83b6/maintainability)](https://codeclimate.com/github/Fazendaaa/I-m-a-Spoiler-Bot/maintainability)

</div>

> A friendly Telegram bot to hide spoilers sent.

## About
Me and my friends were used to use a bot to send spoilers in the main group of anime discussions, but this bot doesn't works anymore. That's why I've decided to write my own version of this bot so we can continue to send each other messages without disturbing the others group members that haven't read manga chapter or watched the anime episode yet.

**note**: all of the spoilers are just stored for one week period!

### Disclaimer
By default all the commands are in English, but you can see if the same command is available in your language.

# How to use it
First of all, talk to [@ispoilerbot](http://t.me/ispoilerbot).

## Sending Spoilers
Basically there are two kinds of spoiler, those of _light_ weight, that won't ask the user to confirm to see it, and those of **heavy** weight, that will will ask permission to be displayed.

The inline mode works in any chat conversation:

```
@ispoilerbot spoiler to be sent here as text
```

Example:

```
@ispoilerbot L dies!
```

<div align="center">
    <img src="./others/gif/help.gif" width="420" height="500" />
</div>

And you can also send a spoiler name it about what it is:

```
@ispoilerbot spoiler to be sent here as text "spoiler name"
```

Example:

```
@ispoilerbot L dies! "Death Note"
```

<div align="center">
    <img src="./others/gif/help.gif" width="420" height="500" />
</div>

## Help
If you have any other questions about it just use it the help command:

```
/help
```

# How does it work?
You can build yourself a bot similar to this one, I've wrote a tutorial about it in my [Podesearch Bot](https://github.com/Fazendaaa/podsearch_bot) just follow the procedures listed in [BUILDING.md](https://github.com/Fazendaaa/podsearch_bot/blob/master/docs/building/BUILDING.md).

# Deployment
This bot is up and running at [Heroku](http://heroku.com/) through the Github integration, that means that each new push to the ```master``` branch means that is the code serving the bot. You can see more about how does it run at the server by looking at the [Procfile](https://github.com/Fazendaaa/I-m-a-Spoiler-Bot/blob/master/Procfile). You can also deploy yourself this bot into Heroku through:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Fazendaaa/I-m-a-Spoiler-Bot)

## Testing
Since there's a [Travis CI](http://travis-ci.org/) integration and [Codecov](https://codecov.io/). All of the tests were written with [Jest](https://facebook.github.io/jest/).

To run all tests just:

```bash
npm test
```

If you ran into some errors related to package dependencies and want to know how to handle it, read the [Security](#security) info.

# Security
I've added a integration with [Snyk](https://snyk.io/) to ensure that all of my dependencies have no bugs or errors reported without fixing it first before Continuos integration (CI) to ensure the Continuos Development (CD).

## Errors/Bugs in Dependencies
When Snyk report some errors or bugs that can be fixed, just follow the CLI command to fix them before running -- more info at their [docs](https://github.com/snyk/snyk#cli).

# Build with
* [dotenv](https://github.com/motdotla/dotenv)
* [emoji-regex](https://github.com/mathiasbynens/emoji-regex)
* [mongoose](http://mongoosejs.com/)
* [node schedule](https://github.com/node-schedule/node-schedule)
* [telegraf](http://telegraf.js.org/#/)
* [telegraf-i18n](https://github.com/telegraf/telegraf-i18n)
* [telegraf-session-local](https://github.com/RealSpeaker/telegraf-session-local)

# Code
Plain and simple [Typescript](http://typescriptlang.org/) and the [Microsoft linter standards](https://github.com/Microsoft/tslint-microsoft-contrib) for it.

# Artwork
I've made all the artwork for it, [Boku No Hero](http://bokunoheroacademia.wikia.com/wiki/My_Hero_Academia_Wiki) was my inspiration.

<div align="center">
    <br>
    <img src="./others/img/logo/logo.png" width=100/>
    <img src="./others/img/spoiler/spoiler.png" width=100/>
    <img src="./others/img/assistant/assistant.png" width=100/>
    <img src="./others/img/name/name.png" width=100/>
    <img src="./others/img/light/light.png" width=100/>
    <img src="./others/img/heavy/heavy.png" width=100/>
    <img src="./others/img/warning/warning.png" width=100/>
    <img src="./others/img/error/error.png" width=100/>
    <img src="./others/img/offline/offline.png" width=100/>
</div>

You can see more in the [img](./others/img) folder.

# Contributing
Please, I'm not a native/fluent english speaker, so whether you see a variable name wrote the wrong way or even some comment where I've wrote something with the wrong "past perfect way of life" or something like that, please let me know it. Not always is just about the code, but rather making it more clear to other people to learn from it.

So, whether is code or not you can help me out making this code more accessible by reading the [CONTRIBUTING.md](./docs/contributing/CONTRIBUTING.md). 

# Versioning
I would love to say that [SemVer](https://semver.org/) or anything like that is used but, in my personal experience, this kind of approach doesn't work very well with me, the guy who could be committing in this project for two weeks in a roll and leave it for almost one year with no simple ```npm update```. So, no versioning system is used. 

# TODO
Since I will be keeping this README up to date with any major change and I don't use any versioning system to log all the fixed bugs or previous projects updates, you can still have a taste of what comes next and what is being under analysis right in the [Projects](https://github.com/Fazendaaa/I-m-a-Spoiler-Bot/projects/) tab.

# Authors
* Only [me](https://github.com/Fazendaaa) for now.

Consider buy me a coffee:

[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/Fazenda)

Or even becoming a patron:

[![Patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/Fazenda/overview)

# License
Like many Open-Source Software (OSS) the MIT license is used, more about it in [LICENSE](./LICENSE).
