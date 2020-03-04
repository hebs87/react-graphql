import React from 'react';
// Gets our query, gets info from GraphQL and then
// gives it back to us as a function that we can
// use in the relevant component, which has access
// to the data we want
import { Query } from 'react-apollo';
// Allows us to make GraphQL requests
import { gql } from 'apollo-boost';

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

// The query to our database - the const name is in all CAPS
// as it never changes
const GET_COLLECTIONS = gql`
    {
        collections {
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

// The CollectionsOverviewContainer will be a functional component
// that returns our Query component that wraps around the
// CollectionsOverview component. The Query component take a
// query property equal to our previously defined query
const CollectionsOverviewContainer = () => (
    // The Query gives us back a function. On that function, we
    // will get an object that holds a lot of different props.
    // The main ones we need are "loading", "error" and "data".
    // We can get the error if we have any error handling
    // components, but we don't in our app so we don't need it
    <Query query={GET_COLLECTIONS}>
        {
            ({loading, error, data}) => {
                return (
                    // If loading is true, we render the Spinner
                    loading ?
                        <Spinner />
                        :
                        // If loading is false, we render the CollectionsOverview
                        // and pass in the data.collections as collections prop
                        <CollectionsOverview collections={data.collections}/>
                );
            }
        }
    </Query>
);

export default CollectionsOverviewContainer;
