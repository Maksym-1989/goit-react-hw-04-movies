import React, { Component /*Suspense, lazy*/ } from "react";
import ApiMovies from "../../api/movies-api";
import { Route, NavLink, Switch } from "react-router-dom";
import Cast from "../../components/cast/Cast";
import Reviews from "../../components/reviews/Reviews";
import defaultImg from "../../images/default.jpg";
import css from "./MovieDetailsPage.module.css";

// const Cast = lazy(() =>
//   import("../../components/cast/Cast" /* webpackChunkName: "Cast" */)
// );

// const Reviews = lazy(() =>
//   import("../../components/reviews/Reviews" /* webpackChunkName: "Reviews" */)
// );

class MovieDetailsPage extends Component {
  state = {
    movie: {},
    genres: [],
    from: null,
  };

  async componentDidMount() {
    const {movieId} = this.props.match.params;
    const response = await ApiMovies.fetchMovieDetails(movieId);
    this.setState({
      movie: response,
      genres: [...response.genres],
      from: this.props.location.state.from,
    });

  }

  getYear = (data) => String(data).slice(0, 4);

  getPercent = (vote) => vote * 10;

  handleGoBack = () => {
    const { history } = this.props;
    history.push(this.state.from || "/");

  };

  render() {
    const {
      poster_path,
      original_title,
      release_date,
      vote_average,
      overview,
    } = this.state.movie;

    const { genres } = this.state;
    return (
      <div className={css.cardWrapper}>
        <button
          type="button"
          onClick={this.handleGoBack}
          className={css.btnGoBack}
        >
          Go back
        </button>
        <div className={css.img_box}>
          <div className={css.card_img}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w342/${poster_path}`
                  : defaultImg
              }
              alt={original_title}
              className={css.img}
            />
          </div>

          <div className="card">
            <h2 className={css.card_title}>
              {original_title} {this.getYear(release_date)}
            </h2>

            <p className={css.card_text}>
              User Score: {this.getPercent(vote_average)}%{" "}
            </p>

            <h3 className={css.card_subtitle}>Overview </h3>

            <p className={css.card_text}>{overview}</p>

            <h3 className={css.card_subtitle}>Genres</h3>

            <ul className={css.list}>
              {genres.map(({ id, name }) => (
                <li key={id} className={css.card_text_list}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={css.information_box}>
          <h3 className={css.title}>Additional information</h3>

          <ul className={css.list_group}>
            <li className={css.list_item}>
              <NavLink
                to={`${this.props.match.url}/cast`}
                className={css.nav_link}
                activeClassName={css.active}
              >
                Cast
              </NavLink>
            </li>
            <li className={css.list_item}>
              <NavLink
                to={`${this.props.match.url}/reviews`}
                className={css.nav_link}
                activeClassName={css.active}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          {/* <Suspense fallback={<h2>Loading...</h2>}> */}
          <Switch>
            <Route
              exact
              path={`${this.props.match.path}/cast`}
              component={Cast}
            />

            <Route
              exact
              path={`${this.props.match.path}/reviews`}
              component={Reviews}
            />
          </Switch>
          {/* </Suspense> */}
        </div>
      </div>
    );
  }
}

export default MovieDetailsPage;
