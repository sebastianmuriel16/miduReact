import { Link } from "../Link";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page</p>
      <Link to="/about"> Go to About Page</Link>
    </div>
  );
}
