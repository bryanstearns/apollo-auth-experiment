I'm working on building an authentication mechanism over graphql, and I'm trying to figure out why a graphql-connected component isn't refereshing. This is a stripped-down example that exhibits the problem I'm seeing.

* You can try this out here: https://m4nlpp86j.codesandbox.io/ (ideally in a browser with the Redux DevTools Extension installed)
* You can mess with the sources live here: https://codesandbox.io/s/m4nlpp86j -- your edits will be your own because CodeSandbox will fork it when you first edit. I suggest you try out your changes by opening your forked URL (from the embedded browser page) in a different browser window, because CodeSandbox's editing stuff seems to interact poorly with Chrome's debugger and/or Redux DevTools)

So, you're sitting on the Home page - you can see some nav links (including a "Sign in" link, so you're not signed in) and a static message.

Click the Users link, to go to a /users route that displays a graphql-connected Users component; it very briefly renders a "loading" message, but because you're not logged in (ie, no Bearer token is included with the query request), the component sees the "Insufficient Permissions" error in the response and redirects to /login.

The /login route presents a "Login as Bob" button: click it to dispatch the LOGIN action (the reducer saves a hard-coded token for subsequent requests), reset the Apollo client store, and go back to the previous page (/users).

The /users page's Users component's query now succeeds and the user list is rendered, yay!

The problem occurs if you now click Sign out, then click the "Log out" button: the LOGOUT action is dispatched (whose reducer discards the token), the client store is reset again, then you go back to the previous page (again, /users). The Users component's query gets the "Insufficient Permissions" message again, so you're redirected back to /login.

Click the "Login as Bob" button again (saves the token, clears the store, goes back to /users).

Again, the /users page's Users component's query succeeds, but this time the component isn't rerendered when the result comes back; it still shows the "loading" message that was rendered when the query request started.

I can look at Redux DevTools Extension's log of actions and see that the final APOLLO_QUERY_RESULT action did seem to succeed: it has the query result in its data attribute, and the Redux state was updated to include the data - it's just that the graphql-wrapped component doesn't rerender.

I'm pretty new at React and Redux; this is the first time I've tried to diagnose a rendering problem. I tried turning the Users component into a full React Component subclass (it's just a functional component now), and added a shouldComponentUpdate method that always returned true, but that didn't do it - I'm wondering whether the graphql higher-order-component is somehow preventing the rerendering, but don't know how to verify this.
