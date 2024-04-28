# Pig Pictionary (pig-pic)

<!-- Project name to be refined... -->

A offline web app for offline pictionary, where the drawing is done outside the app.

It offers:

- word generation based on difficulty
- word selection
- answer reveal
- score keeping
- time keeping
- turn management

## Modes

- Guessers/scoreboard mode
- Drawer mode
- Spectator mode

## Offline multiple device support... How?

Note that the app is designed to be static and offline, so it can be hosted on GitHub entirely for free.

To have this app running on mutliple devices, while having the app as a "offline" (no further network communication) app, **a random seed is needed to be shared among the devices** to ensure that the same words are generated.

I think `Math.random()` should be enough for this purpose, but I'm not sure. We'll see.
