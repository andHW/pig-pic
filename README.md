# 🐷 Pig Pictionary (pig-pic)

<!-- Project name to be refined... -->

An offline web app for offline pictionary, where the drawing is done outside the app.

It provides:

- Word generation based on difficulty
- Word selection
- Answer reveal
- Scorekeeping
- Timekeeping
- Turn management

## Modes

- Guessers/scoreboard mode
- Drawer mode
- Spectator mode

## Offline multiple device support... How?

The app is designed to be static and offline, making it deployable on GitHub without cost.

To enable usage across multiple devices while maintaining the app's offline nature (no further network communication), **a shared random seed is required to ensure consistent word generation**. This necessitates the utilization of tools like seedrandom.js.

While having a server to oversee the game could deter cheating to some extent and facilitate game synchronization across devices, such functionalities are not the primary focus of this project.
