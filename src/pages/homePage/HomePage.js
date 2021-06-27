import React, { Component } from "react";
import ApiMovies from "../../api/movies-api";
import Button from "../../components/button/Button";
import FilmsList from "../../components/filmsList/FilmsList";
import Section from "../../components/section/Section";
class HomePage extends Component {
  state = { films: [], pageNumber: 1 };

  componentDidMount() {
    this.fetchPopularFilms();
  }

  fetchPopularFilms = async () => {
    const { pageNumber } = this.state;
    const { results } = await ApiMovies.fetchPopularMovies({ pageNumber });
    this.setState((prevState) => ({
      films: [...prevState.films, ...results],
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  render() {
    const { films } = this.state;

    return (
      <>
        <Section title="Trending today">
          <FilmsList films={films} />
          <Button btnName="Load more" onClick={this.fetchPopularFilms} />
        </Section>
      </>
    );
  }
}

export default HomePage;
