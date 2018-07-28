# I'm a Spoiler Bot

<div align = "center">
    <br>
    <img src="../../others/img/logo/logo.png" height=260>
    <br>
    <br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](.../../README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./README_PT.md)

[![Build Status](https://img.shields.io/travis/Fazendaaa/I-m-a-Spoiler-Bot.svg?style=flat-square)](https://travis-ci.org/Fazendaaa/I-m-a-Spoiler-Bot)
[![codecov](https://img.shields.io/codecov/c/github/Fazendaaa/I-m-a-Spoiler-Bot.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/I-m-a-Spoiler-Bot)
[![Dependencies](https://david-dm.org/Fazendaaa/I-m-a-Spoiler-Bot.svg?style=flat-square)](https://codeclimate.com/github/Fazendaaa/I-m-a-Spoiler-Bot/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/fazendaaa/podsearch_bot/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fazendaaa/podsearch_bot?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c38351e2ca7bd3a83b6/maintainability)](https://codeclimate.com/github/Fazendaaa/I-m-a-Spoiler-Bot/maintainability)

</div>

> O bot feito para esconder os spoilers enviados.

## Sobre
Eu e uns amigos estávamos acostumados a utilizar um bot para enviar spoilers em um grupo de discussões de anime, mas tal bot parou de funcionar. Foi quando eu decidi fazer a minha versão de um bot assim, para podermos, desta maneira, continuar enviando conteúdos sensíveis sem afetar àqueles que ainda não leram o capítulo do mangá ou até mesmo viram o episódio do anime.

**obs**: todos os spoilers são armazenados por uma semana apenas!

### Aviso
Por padrão os comandos se encontram por em Inglês mas possuem seu equivalente em Português.

## Como utilizar?
Primeiro de tudo, abra uma conversa com o [@ispoilerbot](http://t.me/ispoilerbot).

## Sending Spoilers
Basicamente há dois tipos de spoilers, os de _leve_ peso, que não pedirão ao usuário permissão para serem mostrados, e os de **pesado** peso, que pedirão tais permissões.

O modo inline funciona em qualquer conversa:

```
@ispoilerbot spoiler a ser enviado como texto
```

Exemplo:

```
@ispoilerbot L morre!
```

<div align="center">
    <img src="../../others/gif/help.gif" width="420" height="500" />
</div>

E você pode também enviar o spoiler nomeando ele:

```
@ispoilerbot spoiler a ser enviado como texto "nome do spoiler"
```

Example:

```
@ispoilerbot L morre! "Death Note"
```

<div align="center">
    <img src="../../others/gif/help.gif" width="420" height="500" />
</div>

## Ajuda
Caso precise de mais informações, abra uma conversa com o bot e digite:

```
/help
```

# Como funciona?
Você pode construír um bot similar a este, eu escrevi um tutorial sobre isso no meu [Podesearch Bot](https://github.com/Fazendaaa/podsearch_bot), basta seguir os procedimentos citados em [BUILDING_PT.md](https://github.com/Fazendaaa/podsearch_bot/blob/master/docs/building/BUILDING_PT.md).

# Deployment
Esse bot está rodando no [Heroku](http://heroku.com/) através de integração direta do Github, isso significa que cada nova push para a branch ```master``` representa o código que está atualmente servindo de diretriz por bot. Você pode verificar mais como o bot está rodando através do arquivo [Procfile](https://github.com/Fazendaaa/I-m-a-Spoiler-Bot/blob/master/Procfile). Você também pode enviar uma cópia direta desse código para o Heroku através do seguinte botão:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Fazendaaa/I-m-a-Spoiler-Bot)

## Testando
Como há uma integração com o [Travis CI](http://travis-ci.org/) e [Codecov](https://codecov.io/). Os testes foram escritos com o [Jest](https://facebook.github.io/jest/).

```bash
npm test
```

Se algum erro for reportado durante este processo relacionado com dependências utilizadas e você gostaria de ver como lidar com elas, leia mais em [Segurança](#Segurança).

# Segurança
Eu adicinei uma integração com [Snyk](https://snyk.io/) para garantir que todas as dependências utilizadas não tenham erros ou bugs não concertados antes da Integração Contínua (CI) para garantir o Desenvolvimento Contínuo (CD).

## Errors/Bugs em Dependência
Se o Snyk reportar algum error ou bugs que podem ser corrigidos, apenas siga os passos da ferramenta em como lidar com tais problemas -- para mais ajuda, leia a [documentação](https://github.com/snyk/snyk#cli) deles.

# Construído com
* [dotenv](https://github.com/motdotla/dotenv)
* [mongoose](http://mongoosejs.com/)
* [node schedule](https://github.com/node-schedule/node-schedule)
* [telegraf](http://telegraf.js.org/#/)
* [telegraf-i18n](https://github.com/telegraf/telegraf-i18n)
* [telegraf-session-local](https://github.com/RealSpeaker/telegraf-session-local)

# Código
[Typescript](http://typescriptlang.org/) puro e simples, além dos [padrões de linter da Microsoft](https://github.com/Microsoft/tslint-microsoft-contrib).

# Artes
Eu fiz todos os desenhos do bot, [Boku No Hero](http://bokunoheroacademia.wikia.com/wiki/My_Hero_Academia_Wiki) foi minha inspiração para.

<div align="center">
    <br>
    <img src="../../others/img/logo/logo.png" width=100/>
    <img src="../../others/img/spoiler/spoiler.png" width=100/>
    <img src="../../others/img/assistant/assistant.png" width=100/>
    <img src="../../others/img/name/name.png" width=100/>
    <img src="../../others/img/light/light.png" width=100/>
    <img src="../../others/img/heavy/heavy.png" width=100/>
    <img src="../../others/img/warning/warning.png" width=100/>
    <img src="../../others/img/error/error.png" width=100/>
    <img src="../../others/img/offline/offline.png" width=100/>
</div>

Você pode ver mais na past [img](../../others/img).

# Contribuindo
Por favor, eu não sou nativo/fluente em Inglês, então se você ver uma variável escrita errada ou até mesmo um comentário que eu escrevi de maneira errada, me avise. Contribuições não necessariamente devem ser feitas através de código apenas, elas tem a ver com melhorar o que já está presente das mais diversas maneiras para que mais pessoas possam aprender sobre.

Caso seja o código ou não, você pode me ajudar lendo as diretrizes no arquivo [CONTRIBUTING_PT.md](../contributing/CONTRIBUTING_PT.md). 

# Controle de versão
Eu adoraria dizer que [SemVer](https://semver.org/) ou algo do tipo fora utilizado porém, em experiência pessoal, esse tipo de aborgaem não funciona muito bem comigo, o cara que pode comitar várias vezes esse projeto por duas semanas seguidas e passar um anos sem dar um simples ```npm update``` no projeto. Então, não se é utilizado sistemas de versionamento.

# A realizar
Como esse README estará sendo atualizado com as mudanças importantes, não pretendo utilizar nenhum histórico de atualizações de bugs corrigidos ou novas funcionalidades. Todavia, você pode ter uma noção do que virá e o que está sob análise na aba de [Projects](ttps://github.com/Fazendaaa/I-m-a-Spoiler-Bot/projects/) -- aviso: o conteúdo se encontra em Inglês.

# Autores
* Apenas [eu](https://github.com/Fazendaaa) até agora.

Considere me comprar um café:

[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/Fazenda)

Ou até mesmo se tornar um padrinho:

[![Patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/Fazenda/overview)

Estou analisando a possibilidade de se colocar [PicPay](https://www.picpay.com/site/) e [Padrim](https://www.padrim.com.br/) -- já que são opções muito utilizadas no Brasil.

# Licença
Assim como muitos projetos de código livre, a licença MIT é utilizada aqui. Mais sobre em [LICENSE](../../LICENSE).
