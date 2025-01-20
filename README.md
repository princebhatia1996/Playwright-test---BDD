## Setup Instructions

- This project is a sample setup for using Cucumber and Playwright with TypeScript.
- It has e2e UI tests using the cucumber framework following the BDD syntax.

### Project Structure

The project structure is as follows:

```
Playwright-test-BDD/
├── src/
│   ├── components/
│   ├── pages/
│   ├── tests/
│   │   ├── features/
│   │   │   └── *.feature
│   │   ├── steps/
│   │   │   └── *.steps.js
│   │   └── support/
│   │       └── *.js
│   └── utils/
├── .gitignore
├── package.json
├── README.md
└── playwright.config.js
```

**Clone the repository:**

```
git clone https://github.com/princebhatia1996/Playwright-test-BDD
```

### Running the application

To start the project, you will need a recent version of node.js installed.

From there, run:

```
npm install
npm run start
```

And navigate to the link displayed in the console (probably http://localhost:5173/)

### Running the tests

To run the test, first make sure the application is running (see above).

From there, in a separate terminal/command prompt, run the following command:

```
npm run e2e
npm run test:client-list
npm run test:login
```

## Client Management application

- This test Client management application was developed by Findex.
- The Playwright test is testing the following features of the client management system:

- Logging into the application
- Adding a client to the client list
- Removing a client from the list
