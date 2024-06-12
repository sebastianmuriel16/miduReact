import { Link } from "../Link";
function Page404() {
  return (
    <>
      <div>
        <h1>This is NOT fine</h1>
        <img
          src="https://midu.dev/images/this-is-fine-404.gif"
          alt="gif del perro This is Fine quemandose vivo"
        />
      </div>
      <Link to="/"> Go to Home Page</Link>
    </>
  );
}
export { Page404 };
