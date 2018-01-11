kite-todo-mvc
=============

This app demonstrates how a kite can be used to track a to-do list.

To get started first clone this repo and then install required node modules.

```
git clone https://github.com/usirin/kite-examples.git
cd kite-examples/src/todo-mvc
npm install
```

To run the server:

```
npm run start:server
```

This will initialize a `todo-mvc` kite server on port `7780` and will wait for connections.

To run the frontend application:

```
npm start
```

The frontend for this example is using `React` and it's created with `create-react-app`.
Once the frontend server is running, navigate to `http://localhost:3000` and
you should see the to-do mvc app talking with your kite server.
