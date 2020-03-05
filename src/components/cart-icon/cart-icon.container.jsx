import React from "react";
// Allows us to wrap our exported component and
// leverage the queries and mutation that we write,
// which can then be passed into the Container
// component as props
import {graphql} from 'react-apollo';
// Acts like the connect HOC
import {flowRight} from 'lodash';
// Allows us to make GraphQL requests
import {gql} from 'apollo-boost';

// Import the itemCount query to avoid repeating it here
import {GET_ITEM_COUNT} from '../../graphql/resolvers';

import CartIcon from "./cart-icon.component";

// We write our mutation instead of a query. We use
// the same declaration name, but instead, we say
// we want to call the mutation that we defined in our
// typeDefs. Inside it, we get back the toggleCartHidden
// mutation that we wrote inside our resolver and specify
// that we want to get this from the client - this is
// the function that changes the cartHidden value
const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

// This is an alternative way of leveraging our queries
// and mutations in our Container components by using the
// flowRight and graphql functions, instead of the Query
// and Mutation components
// Once we pass the query or mutation into the graphql
// function, our component will then have access to the
// properties of that query or mutation - e.g. the itemCount
// prop from the GET_ITEM_COUNT query - which can then be
// passed into the component as a prop
// In this instance, we want to pluck off the itemCount from
// the data object on our props, and also the toggleCartHidden
const CartIconContainer = ({data: {itemCount}, toggleCartHidden}) => (
    <CartIcon
        toggleCartHidden={toggleCartHidden}
        itemCount={itemCount}
    />
);

// flowRight is a function that will group in all of the
// queries and mutations that we need to add to our
// Container component. To do that, we use the graphql
// function within the flowRight function. Then we pass
// in the Container component to the return of flowRight
export default flowRight(
    // We call graphql and pass it either a query or mutation
    // The name of the object we get back is data, but we can
    // rename this if we want by using the method as we do
    // with the mutation below
    graphql(GET_ITEM_COUNT),
    // When we pass in a mutation, it doesn't call it the
    // name that we give it within the declared mutation,
    // it calls it 'mutate' instead. In this instance, it
    // calls toggleCartHidden mutate instead. To give it
    // the correct name, we can pass in a config object as
    // the second argument. This can take a number of
    // different properties, but the main one we want is
    // 'name', which will allow us to rename it
    graphql(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'})
)(CartIconContainer);
