# PlantWatcher API

The [Node.js](https://nodejs.org/) backend API server of the PlantWatcher project running as [Cloud Functions](https://firebase.google.com/docs/functions) on [Google Firebase](https://firebase.google.com/).

## Prerequisites

1. Install Firebase CLI globally using Node: `npm install -g firebase-tools`
2. Setup a Firebase project and connect it with the local project environment following the [instructions](https://firebase.google.com/docs/admin/setup).
3. Install the project dependencies in the current folder: `npm install`
4. Copy `.env.example` to `.env` and set the proper environment variables.

## Execution

Run in local emulator:

```
npm run serve
```

Deploy to Firebase:

```
npm run deploy
```
