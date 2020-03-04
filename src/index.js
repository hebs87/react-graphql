import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// Similar to the Redux provider - allow the app to be
// able to access the state stored on Apollo
import {ApolloProvider} from 'react-apollo';
// Allows us to connect our Client to the specific
// endpoint - /graphql, instead of multiple endpoints
import {createHttpLink} from 'apollo-link-http';
// Allows Apollo to cache the fetched data
import {InMemoryCache} from 'apollo-cache-inmemory';
// The Client itself
// gql allows us to test the client - can be removed once tested
import {ApolloClient, gql} from 'apollo-boost';

import {store, persistor} from './redux/store';

import './index.css';
import App from './App';

// Set up the connection to our backend using createHttpLink
// which takes an object in which we specify the URI endpoint
const httpLink = createHttpLink({
    uri: 'https://crwn-clothing.com'
});

// Create our cache, which will be a new object which we call
// on our new InMemoryCache, which is a class. It is something
// we will use to manage our data - like a top level reducer
const cache = new InMemoryCache();

// Create the client, which takes an object in which we set
// the link to thee httpLink and the cache to the cache
const client = new ApolloClient({
    link: httpLink,
    cache
});

// Test the Client using a query. In order to use syntax
// similar to GraphQL, we call the gql method and then
// specify the query within the back ticks. This returns
// us a promise which resolved to the data, if it manages
// to fetch the data successfully
// We then console log the response
// We can remove this once we've successfully tested the
// connection
client.query({
    query: gql`
        {
            getCollectionsByTitle(title: "hats") {
                id
                title
                items {
                    id
                    name
                    price
                    imageUrl
                }
            }
        }
    `
}).then(res => console.log(res));

ReactDOM.render(
    // We wrap the app in the ApolloProvider component and
    // pass in the client, using the client property
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App/>
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);
