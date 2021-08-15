
# Incident tracking tool
Hi! This my proposed solution for the **Incident tracking tool** statement described [here](./statement.md)


## Requirements

* **Npm v7+** (for npm workspaces)  
  
* **Docker** + ** Docker-compose** (optional)


## How to

 1. First of all, in project root, run:

```
npm i
```

> since you are using npm v7+ it will install all **workspaces** dependencies and create links and aliases between them so we can use `import * from @iit-common` directly in all workspaces
>
>**workspaces** are listed in root `package.json`

 2. Build client app:

```
npm run build -w client
```

 3. Start client app:

```
npm run start -w client
```
> in one terminal tab (or in background mode)

 4. Start server app:
```
npm run start -w server
```

Alternatively you can use docker-compose for building and running apps, in that case replace steps 2, 3 and 4 with:

    docker-compose up

You know every things work as it has to if outputs are :
* `ready - started server on 0.0.0.0:3000, url: http://localhost:3000` for client
*  `🚀  Server ready at http://localhost:4000/` for server

In you favorite browser (apps was tested with Chrome) go to http://localhost:3000/form

## Automated tests
You can run jest tests in different workspaces:
```
npm run test -w client
npm run test -w server
npm run test -w common
```

## Architecture
We talked about typescript together, as you know i'm working with this language and since you say it is okay to use it for this exercise I choose to made the project with

I choose npm workspaces because i like monorepos. Solutions exist like [lerna](https://github.com/lerna/lerna) and [nx ♥️](https://nx.dev/) but you said you like starting from scratch. Moreover it was the opportunity for testing this recent npm feature 🙂.

For server app ts-node and ts-node-dev is used to run project, we do not need to transpile sources in that case 👍

For client, I had two choices [Next.js](https://nextjs.org/) and [CRA](https://create-react-app.dev/docs/getting-started/), in fact I started with CRA but I had problems with npm worskpaces and @itt-common shared library. So I switched to Next.js and I had to add this [additional module transpiler](https://www.npmjs.com/package/next-transpile-modules) in next.config.js.

I choose [jest](https://jestjs.io/fr/) for automated tests (+ [Enzyme](https://enzymejs.github.io/enzyme/) for client)

## Suggested improvements

* Better design
* Form validation error styling
* success and errors toasts
* More automated tests
* Split [form.tsx](./client/pages/form.tsx) in multiple components (for all Controllers)
* Search and autocomplete emails in [EmailsInput](./client/components/EmailsInput.tsx)
* Default date to Today in date input
* Design Dockerfiles for production mode
* More description in Readme and more comments in code
* change search/autocomplete strategy in relaypointInput
