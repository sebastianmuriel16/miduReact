// import HomePage from "./Pages/Home";
// import AboutPage from "./Pages/About";// import estatico
import { Router } from "./Router";
import { Page404 } from "./Pages/404";
import { SearchPage } from "./Search";
import { Route } from "./Route";
import { Suspense, lazy } from "react";

const lazyAboutPage = lazy(() => import("./Pages/About.jsx")); // <- lazy loading
const lazyHomePage = lazy(() => import("./Pages/Home.jsx"));

const routes = [
  {
    path: "/search/:query",
    component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path="/" component={lazyHomePage} />
          <Route path="/about" component={lazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
