import PropTypes from "prop-types";
function SearchPage({ routeParams }) {
  return <h1>Search: {routeParams.query}</h1>;
}

SearchPage.propTypes = {
  routeParams: PropTypes.object.isRequired,
};

export { SearchPage };
