import React from 'react';
// Gets our query and mutation, gets info from
// GraphQL and then gives it back to us as a
// function that we can use in the relevant
// component, which has access to the data we want
import {Mutation} from 'react-apollo';

// Allows us to make GraphQL requests
import {gql} from 'apollo-boost';

import CollectionItem from "./collection-item.component";

// We write our mutation. We say we want to call the
// mutation that we defined in our typeDefs. Inside it,
// we get back the addItemToCart mutation that we wrote
// inside our resolver and specify that we want to
// get this from the client - this is the function that
// adds the item to the cart
const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    }
`;

// The CollectionItemContainer will be a functional component
// that returns our Query component that wraps around the
// CollectionItem component. The component take the props
// argument, as it is being used in the CollectionPreview
// component, which passed the item in as a prop. For this
// reason, the CollectionItem is expecting it to be passed
// down, along with the item name, image and other details.
// The Mutation component takes a query property equal to our
// previously defined query
const CollectionItemContainer = props => (
    <Mutation mutation={ADD_ITEM_TO_CART}>
        {
            // We get our addItemToCart mutation and pass it
            // into our CollectionItem, but we also need to
            // spread in the props, because our CollectionItem
            // depends on this prop. We also make a function in
            // the addItem prop, which gets the item, calls the
            // mutation and then passes in the item as the
            // variables key, that has the value of an object
            // in which the item key is equal to the item itself.
            // This is shorthand, as it saves us declaring the
            // variables in our Mutation and then grab the prop.
            // Instead, it calls the mutation and passes it the
            // variables key that it is expecting
            addItemToCart => (
                <CollectionItem
                    {...props}
                    addItem={item => addItemToCart({variables: {item}})}
                />
            )
        }
    </Mutation>
);

export default CollectionItemContainer;
