import React from 'react';
// Gets our query, gets info from GraphQL and then
// gives it back to us as a function that we can
// use in the relevant component, which has access
// to the data we want
import {Query} from 'react-apollo';
// Allows us to make GraphQL requests
import {gql} from 'apollo-boost';

import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";

// The query to our database - the const name is in all CAPS
// as it never changes
// To get this query, we pass in a title of the collection
// we want to get. So, in our query, we first say that
// the title variable is a string type, then we want
// to run the relevant query where the title is the
// value of the variable that we set initially
// We are basically passing in parameters
const GET_COLLECTIONS_BY_TITLE = gql`
    query getCollectionsByTitle($title: String!) {
        getCollectionsByTitle(title: $title) {
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
`;

// The CollectionPageContainer will be a functional component
// that returns our Query component that wraps around the
// CollectionPage component. We want to pass in our match
// prop from the Route component in the App.js file, as this
// is what we need to get the relevant URL param
// The Query component takes a query property equal to our
// previously defined query. It also takes the variable that
// we want to define, in this instance it is our
// match.params.collectionId, which will be the value of the
// title property that gets passed into the query
const CollectionPageContainer = ({ match }) => (
    // The Query gives us back a function. On that function, we
    // will get an object that holds a lot of different props.
    // The main ones we need are "loading", "error" and "data".
    // We can get the error if we have any error handling
    // components, but we don't in our app so we don't need it
    <Query
        query={GET_COLLECTIONS_BY_TITLE}
        variables={{title: match.params.collectionId}}
    >
        {
            ({loading, data}) => {
                // If loading is true, we render the Spinner
                if (loading) return <Spinner />
                // If loading is false, we destructure the relevant
                // data from the data prop (name of the query itself)
                // and then render the CollectionPage and pass in the
                // destructured data. The reason we do this after the
                // data has loaded is because we get back an undefined
                // value when loading is true, so we are unable to
                // destructure anything from the data at that point
                const {getCollectionsByTitle} = data;
                return <CollectionPage collection={getCollectionsByTitle} />
            }
        }
    </Query>
);

export default CollectionPageContainer;
