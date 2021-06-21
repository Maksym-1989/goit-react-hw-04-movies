import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";

// import HomePage from "./pages/homePage/HomePage";
// import MovieDetailsPage from "./pages/movieDetailsPage/MovieDetailsPage";
// import MoviesPage from "./pages/moviesPage/MoviesPage";
// import NotFoundPage from "./pages/notFoundPage/NotFoundPage";

import routes from "./routes";

const HomePage = lazy(() =>
  import("./pages/homePage/HomePage.js" /* webpackChunkName: "HomePage" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./pages/movieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);
const MoviesPage = lazy(() =>
  import("./pages/moviesPage/MoviesPage" /* webpackChunkName: "MoviesPage" */)
);
const NotFoundPage = lazy(() =>
  import(
    "./pages/notFoundPage/NotFoundPage" /* webpackChunkName: "NotFoundPage" */
  )
);

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Suspense fallback={<h2>Loading...</h2>}>
          <Switch>
            <Route exact path={routes.home} component={HomePage}></Route>
            <Route exact path={routes.movies} component={MoviesPage}></Route>
            <Route
              path={routes.moviesDetails}
              component={MovieDetailsPage}
            ></Route>
            <Route component={NotFoundPage}></Route>
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App;
