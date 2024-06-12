import { EVENTS } from "./const";
import PropTypes from "prop-types";
function navigate(href) {
  window.history.pushState({}, "", href);
  //crear un evento personalizado
  const navigationEvent = new Event(EVENTS.NAVIGATION);
  window.dispatchEvent(navigationEvent);
}

function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0; // primaty click
    const isModifiedEvent =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to); //navigate with SPA
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props}></a>;
}

export { Link };

Link.propTypes = {
  target: PropTypes.string,
  to: PropTypes.string.isRequired,
};
