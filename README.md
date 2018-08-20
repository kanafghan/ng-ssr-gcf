# Angular SSR (Server-side Rendering) using Google Cloud Functions (GCF)

A demo/experiment of deploying an Angular 6 SSR app using Google Cloud Functions together with Firebase Hosting.

## Getting Started

This repo consists of three branches:

- **master:** the simpelst Angular SSR app that can be deployed to Firebase using GCF and Firebase Hosting.
- **angularfire:** the extension of **master** branch with `angularfire2` and usage of RTDB on Firebase. This version of the app can also be deployed to Firebase using GCF and Firebase Hosting and should work as entented.
- **admin:** the extension of **angularfire** branch with usage of `firebase-admin` package which is initialized in the `index.js` file and the RTDB is used in the `demo` function. This version of the app can also be deployed to Firebase using GCF and Firebase Hosting and should work as entented.

**NOTE:** both the *admin* as well as *angularfire* branch requires Firebase web config object in order to be deployed or served locally. Check the `environment.ts` and `environment.prod.ts` files under `pwa/src/environments` folder.

### Building

Build the SSR app using the following command from the `pwa` folder:

```bash
$ npm run build:ssr
```

### Running Locally

Run the app locally with SSR using the following command from the root folder of the project.

```bash
$ firebase deploy --only functions,hosting
```

### Deploying

In order to deploy the app use the following command from the root folder of the project:

```bash
$ firebase deploy --only functions,hosting
```

## Results

This experiment helped me find out the issue with Angular Universal not working on GCF. What I found was the fact that Firebase SDK will not allow initialization of two "connections" to the RTDB, i.e. one from `angularfire2` and another through `firebase-admin`.
