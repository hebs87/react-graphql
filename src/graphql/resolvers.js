import { gql } from 'apollo-boost';
// Import cart utils to enable adding item to cart
import { addItemToCart } from './cart.utils';

// We define the schema that we want to use which specifies the
// mutations that we will have access to. This will be stored in
// a const called typeDefs - type definitions. We first say
// 'extend type Mutation', so that we extend any Mutations that
// are currently defined in the backend - this will give us access
// to them. If there are none then we won't get anything back, but
// it prevents having to modify anything if any are defined in
// future. We will then add our own in the curly braces after it.
// With the extend type Item, we are extending from the Item type
// inside our database in our GraphQL server
// The first Item type is the Item quantity, which will be an int -
// we don't set the ! as it can be empty
// The first Mutation is ToggleCartHidden, which will always be a
// boolean - (! signifies it is mandatory)
// The second Mutation is AddItemToCart, which will take an item,
// the value of which will be the Item itself, and it will return
// an array of Items - the Items may be empty, but the array is
// mandatory
// ***TYPE DEFINITIONS SHOULD BE CAPITALIZED***
export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
    }
`;

// We need to read the cartHidden value from our cache - the one we
// want to set and mutate. The @client directive lets Apollo know
// that we are looking for the property on the client side
export const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

// We need to read the cartItems value from our cache - the one we
// want to set and mutate
export const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

// This is the actual resolver - an object in which we define what
// mutation/queries/additional types on our client side cache that
// Apollo has access to inside this object
export const resolvers = {
    // We define our mutation - it goes to an object where the key
    // of the mutation is the mutation we are trying to write
    // ***The mutation definition uses camelCase***
    Mutation: {
        // The value of the mutation will be a function that gets
        // four arguments (underscores mean they can't be modified):
        // _root - represents the top level object that holds the
        // actual type *the parent*. In our instance, we are at the
        // top level already, so this will be an empty object
        // _args - all arguments that we could get access to in the
        // mutation, so pretty much the variables that get passed
        // into the mutation or query
        // _context - the thing that the Apollo Client has access
        // to, including the cache and the client. If we want to
        // make changes to the client, we can destructure it off.
        // Otherwise, we will only need the cache, so we should
        // only destructure that off instead
        // _info - has info about our query or mutation. We won't
        // need it so we don't need to include it
        // *** We only need the args and the cache ***
        toggleCartHidden: (_root, _args, {cache}) => {
            // First, we want to read the query which was declared
            // above - getting the cartHidden value from the client
            // readQuery gets an object where the query is the
            // actual query that we're passing in. If we wanted to
            // pass any values in, we can also use a variables key
            // which will receive an object with the variables
            // We get this back as a data object, which has the
            // cartHidden value that we want, so we can destructure
            // this off
            const {cartHidden} = cache.readQuery({
                query: GET_CART_HIDDEN
            });

            // After getting the value, we want to update the cache
            // with the reverse value. To do that, we use writeQuery.
            // We say the query goes to the same query that we read
            // from, and we want to update it with the data which is
            // an object in which we specify that the cartHidden
            // value goes to the opposite of the current value
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: {
                    cartHidden: !cartHidden
                }
            });

            // Finally, we return the opposite cartHidden value
            return !cartHidden;
        },

        // The second mutation here is the addItemToCart, which takes
        // the variable of item (declared in our typeDef, and this
        // replaces _args), and also the cache
        addItemToCart: (_root, {item}, {cache}) => {
            // First, we want to read the GET_CART_ITEMS query
            // We get this back as a data object, which has the
            // cartItems value that we want, so we can destructure
            // this off
            const {cartItems} = cache.readQuery({
                query: GET_CART_ITEMS
            });

            // We call our addItemToCart util function here and pass
            // in the existing cartItems that we pulled from the cache,
            // and also our item that we want to add
            const newCartItems = addItemToCart(cartItems, item);

            // After getting the value, we want to update the cache
            // with the newCartItems. To do that, we use writeQuery.
            // We say the query goes to the same query that we read
            // from, and we want to update it with the data which is
            // an object in which we specify that the cartItems value
            // goes to the value of newCartItems
            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: {
                    cartItems: newCartItems
                }
            });

            // Finally, we return the newCartItems
            return newCartItems;
        }
    }
};
