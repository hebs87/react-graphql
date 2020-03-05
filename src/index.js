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
import {ApolloClient} from 'apollo-boost';

import {store, persistor} from './redux/store';

import './index.css';
import App from './App';

// Import our resolvers and typeDefs once written
import { typeDefs, resolvers } from './graphql/resolvers';

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
// the link to the httpLink and the cache to the cache
const client = new ApolloClient({
    link: httpLink,
    cache,
    // Once we've written the typeDefs and resolvers, we pass
    // them in as themselves here to give our client access to
    // the mutations we just wrote
    typeDefs,
    resolvers
});

// To leverage local storage, we want to do this on the
// client and leverage the cache. So, as soon as the client
// is created for the first time, we immediately want to
// write the data into the client. We need to instantiate it
// with the data, which will have a value of an object with
// all the keys that we want to store
client.writeData({
    data: {
        // We want to replace the hidden value of the cart
        // so we need to specify that here and set the
        // default value to true
        cartHidden: true,
        // We set the initial state of the cartItems to an
        // empty array
        cartItems: [],
        // We set the initial state of the itemCount to 0
        itemCount: 0
    }
});

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
