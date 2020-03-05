import React from 'react';
// Gets our query and mutation, gets info from
// GraphQL and then gives it back to us as a
// function that we can use in the relevant
// component, which has access to the data we want
import {Query, Mutation} from 'react-apollo';

// Allows us to make GraphQL requests
import {gql} from 'apollo-boost';

// This is the query that gets our cartItems from the
// stored cache. We've imported it in as it saves us
// from having to write it out again
import { GET_CART_ITEMS } from '../../graphql/resolvers';

import CartDropdown from "./cart-dropdown.component";

// We write our mutation. We say we want to call the
// mutation that we defined in our typeDefs. Inside it,
// we get back the toggleCartHidden mutation that we
// wrote inside our resolver and specify that we want to
// get this from the client - this is the function that
// changes the cartHidden value
const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

// The CartDropdownContainer will be a functional component
// that returns our Mutation component that wraps around the
// Query component, that then wraps around the CartDropdown
// component - the order of wrapping isn't important, as long
// as we get the right functions, and they both wrap around
// the component that we ultimately render
const CartDropdownContainer = () => (
    // We pass the mutation into the Mutation, which gets the
    // toggleCartHidden function and then renders the Query
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            toggleCartHidden =>(
                // We pass the query into the Query, which gets
                // the cartItems object from the data and then
                // renders the CartDropdown
                <Query query={GET_CART_ITEMS}>
                    {
                        ({data: {cartItems}}) => (
                            // We pass the cartItems and
                            // toggleCartHidden into the component
                            // so it gets all the functionality
                            <CartDropdown
                                cartItems={cartItems}
                                toggleCartHidden={toggleCartHidden}
                            />
                        )
                    }
                </Query>
            )
        }
    </Mutation>
);

export default CartDropdownContainer;
