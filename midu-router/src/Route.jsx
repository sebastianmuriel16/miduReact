import PropTypes from "prop-types";

function Route({ path, component }) {
  return null;
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export { Route };
