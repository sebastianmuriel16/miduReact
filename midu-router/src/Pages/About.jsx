import { Link } from "../Link";
export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <img
        width={300}
        height={300}
        src="https://i.pinimg.com/736x/90/b0/d7/90b0d7d45e486463d6ee361bd8da5c81.jpg"
        alt="character image"
      />
      <p>This is the about page</p>
      <Link to="/"> Go to Home Page</Link>
    </div>
  );
}
