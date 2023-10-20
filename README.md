# x4-pipe-rive-demo proof of concept

This is just a proof of concept to display data extracted from the PC game X4: Foundations via a local socket (or NamedPipe Server on Windows) in a browser using Rive animations. The data is passed on from the game socket via an Express server (that is also used to provide the React app) and SocketIO to a small React app that runs some Rive demo animation files in a browser.

For this data is picked up from a local socket file on disk (see `.env`). The data has to be formatted similar to the well known Elite Dangerous Status as described on https://elite-journal.readthedocs.io/en/latest/Status%20File/ with a few additional fields (see `interfaces`). An additional extension  (game mod) is required for this but thanks to the nature of the well known Status File it may as well be fed from other games.

I wrote this as demo for `C-Pit 101` to see if Rive could be a feasible addition to our simulated home cockpits (see e.g. mine at https://SimPit.dev).

Here is a short demo video to showcase how this may look:

https://www.youtube.com/watch?v=5-G3YEmJBng / https://tube.tchncs.de/w/3F37KZuBmYtwJzLDioGpi8

Setting up the required game extension|s is out of the scope of this but this basically builds on the work of `SirNukes Mod Support APIs` (see https://github.com/bvbohnen/x4-projects/releases)

Maybe it is of use for others too. Probably not. Anyway here goes.

---
## Requirements

For development you will need Node.js and npm.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Node installation on Fedora

  You can install nodejs and npm easily with dnf install, just run the following commands.

      $ sudo dnf install nodejs
      $ sudo dnf install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

## Install

    $ git clone https://github.com/bekopharm/x4-pipe-rive-demo
    $ cd x4-pipe-rive-demo
    $ npm install
    $ cd client
    $ npm install
    $ cd ..

## Configure

Check `.env` and `client/src/config.ts` and adjust to your needs. Project has to be rebuild on changes.

## Simple build and run for development

    $ npm run dev

Dev starts _two_ applications. The backend Express webserver (default http://localhost:8000/) and a React developtment server (default http://localhost:3000/) - live reloading only works for each app on their own ports (8000 does not update the provided app in that case, only 3000 does live reload on code changes).

## Simple build and run for production

    $ npm run build
    $ npm run start

Prod builds and starts only the Express webserver application (default http://localhost:8000/) where it ships the built React app and also `/api` and `Socket.IO`.

