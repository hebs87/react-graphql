import React from "react";
// Gets our query, gets info from GraphQL and then
// gives it back to us as a function that we can
// use in the relevant component, which has access
// to the data we want
import {Query} from 'react-apollo';

import Header from "./header.component";
// As we've already written the query in our resolvers.js
// file, we can just import it here, so we don't have to
// re-write it
import { GET_CART_HIDDEN } from '../../graphql/resolvers';

// The HeaderContainer will be a functional component
// that returns our Query component that wraps around the
// Header component. The Query component takes a
// query property equal to our previously defined query
const HeaderContainer = () => (
    // The Query gives us back a function. On that function, we
    // will get an object that holds a lot of different props.
    // The main ones we need are "error" and "data". From the
    // data, we want the cartHidden value, so we destructure it
    // We can get the error if we have any error handling
    // components, but we don't in our app so we don't need it
    <Query query={GET_CART_HIDDEN}>
        {
            ({data: {cartHidden}}) =>
                // We render the Header component where the hidden
                // prop goes to carHidden. This ensures the Header
                // component is receiving the hidden value from the
                // new query instead of Redux
                <Header hidden={cartHidden} />
        }
    </Query>
);

export default HeaderContainer;
