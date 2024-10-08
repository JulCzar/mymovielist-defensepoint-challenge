## [My Movie List](https://mymovielist-beta.vercel.app/)

My Movie List is a service that uses the [Open Movie DB](https://www.omdbapi.com/) API to list the most popular movies and keep track of watched titles.

Using it is simple. Just search for the movie using our filters, mark the titles you've watched, and the history will be stored in your browser. So, remember to export it if you want to save your progress before formatting your computer or switching browsers.

## Usage

The application is available for viewing at [vercel](https://mymovielist-beta.vercel.app/)

## Project dependencies:

- [Axios](https://axios-http.com/docs/intro): For handling HTTP requests
- [ChakraUI](https://chakra-ui.com/docs/getting-started): As Design system framework
- [Next](https://nextjs.org/): as a React framework for server-side rendering
- [React](https://reactjs.org/): as the main library for the project
- [Typescript](https://www.typescriptlang.org/): for static typing and better code quality

API: [https://www.omdbapi.com/](https://www.omdbapi.com/)

Design: [https://dribbble.com/shots/9956355](https://dribbble.com/shots/9956355)

## Instructions to run the project locally

Requirements:

- Node 20.x+

Clone the project to your machine. In the terminal, navigate to the cloned repository and install the dependencies using `npm install` or `yarn install` if you prefer.

Next, create a `.env` file and add the key `OMDB_API_KEY` with the token for the API from [Open Movie DB](https://www.omdbapi.com/).

To start the project, run the following commands:

```bash
npm run build;
# or yarn build
npm run start;
# or yarn start
```

Open your browser and go to [http://localhost:3000](http://localhost:3000) (\*) in the address bar to access the project locally.

Alternatively, you can also run the project using:

```bash
npm run dev;
# or yarn dev
```

This reduces the number of commands, but this command runs a development version of the project with hot-reload (\*\*) enabled, which will demand more from your computer.

### Notes:

\* The default port for the application is 3000, but if another service on your computer is already using that port, another one will be allocated for the application. Check the terminal for the port in use.

\*\* Automatic server restart after code changes.
