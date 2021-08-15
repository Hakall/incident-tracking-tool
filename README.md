
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

## Suggested improvements

* Better design
* Split [form.tsx](./client/pages/form.tsx) in multiple components (for all Controllers)
* Search and autocomplete emails in [EmailsInput](./client/components/EmailsInput.tsx)
* Default date to Today in date input
* Design Dockerfiles for production mode
