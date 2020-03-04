import React from 'react';
import { Route } from 'react-router-dom';

// When we make default imports, we have access in the
// curly braces to the default alias. So we are essentially
// saying we want to import whatever is exported by default
// (CollectionsOverviewContainer) in the relevant file, but
// we want to call it CollectionsOverview instead
// Doing this saves us having to change any other code in
// our app
import {
    default as CollectionsOverview
} from '../../components/collections-overview/collections-overview.container';
// We do the same with our CollectionPageContainer once we've
// create it, and import it in as CollectionPage
import {
    default as CollectionPage
} from '../collection/collection.container';

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
