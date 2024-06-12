import { useEffect, useState, Children } from "react";
import { EVENTS } from "./const";
import PropTypes from "prop-types";
import { match } from "path-to-regexp";
function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener(EVENTS.NAVIGATION, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    //clean up function to remove the event listener
    return () => {
      window.removeEventListener(EVENTS.NAVIGATION, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routesParams = {};

  //add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";
    return isRoute ? props : null;
  });

  const routesToUSe = routes.concat(routesFromChildren);

  const Page = routesToUSe.find(({ path }) => {
    if (path === currentPage) return true;

    //hemos usado path-to-regexp para
    //poder detectar rutas dinamicas como por ejemplo
    // /search/:query <- que es una ruta dinamica
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPage);
    if (!matched) return false;

    //guardamos los params de la url que eran dinamicos
    //y que hemos extraido con path-to-regexp
    // por ejemplo, si la ruta es /search/:query
    // y la url es  /search/123, matched.params = { query: '123' }
    routesParams = matched.params;
    return true;
  })?.component;

  return Page ? (
    <Page routeParams={routesParams} />
  ) : (
    <DefaultComponent routeParams={routesParams} />
  );
}

export { Router };

Router.propTypes = {
  routes: PropTypes.array,
  defaultComponent: PropTypes.func,
  children: PropTypes.node,
};
