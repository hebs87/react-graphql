import React from "react";
// Gets our mutation, gets info from GraphQL and then
// gives it back to us as a function that we can
// use in the relevant component, which has access
// to the data we want
// We also need our Query for the itemCount
import {Mutation, Query} from 'react-apollo';
// Allows us to make GraphQL requests
import {gql} from 'apollo-boost';

// Import the itemCount query to avoid repeating it here
import { GET_ITEM_COUNT } from '../../graphql/resolvers';

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

// The CartIconContainer will be a functional component
// that returns our Mutation component that wraps around
// the CartIcon component. The Mutation component takes a
// mutation property equal to our previously defined mutation
// Once we've written the GET_ITEM_COUNT query, we want to
// wrap the Mutation component with the Query component
const CartIconContainer = () => (
    <Query query={GET_ITEM_COUNT}>
        {
            // We get the itemCount from the data and then pass it into
            // the CartIcon component as the value for the itemCount prop
            ({data: {itemCount}}) => (
                // The Mutation gives us back a function. On that function,
                // we get the actual value of the mutation, which is the
                // function that changes the value of the cartHidden prop.
                // We then pass this into the CartIcon component
                <Mutation mutation={TOGGLE_CART_HIDDEN}>
                    {
                        toggleCartHidden =>
                            <CartIcon
                                toggleCartHidden={toggleCartHidden}
                                itemCount={itemCount}
                            />
                    }
                </Mutation>
            )
        }
    </Query>
);

export default CartIconContainer;
