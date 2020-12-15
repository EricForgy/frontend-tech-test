# ⏱ Front-End Technical Test

> A small application that display the current number of stars a GitHub repository has.

The technical test is a monorepo, consisting of a React application and GraphQL API. It uses similar technologies and libraries to those we use in our customer-facing application.

## Getting started

Run `npm install` and then either `npm start` to start the development server, or `npm test` to run the tests. Once the server is running, you can visit http://localhost:3000/facebook/react to view a repository page, or http://localhost:4000/playground to view the Apollo GraphQL Playground.

## Tasks

- In addition to the stars, display the current number of watchers a repository has.
- Instead of having a hardcoded list in the Front-End, build a GraphQL query that retrieves this hardcoded list from the BFF instead.
- Display the avatar for the repository currently being viewed.
- Introduce a design system to prettify the UI.
