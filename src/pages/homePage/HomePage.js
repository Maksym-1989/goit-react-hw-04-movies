import React, { Component } from "react";
import ApiMovies from "../../api/movies-api";
import Button from "../../components/button/Button";
import FilmsList from "../../components/filmsList/FilmsList";
import Section from "../../components/section/Section";
class HomePage extends Component {
  state = { films: [], pageNamber: 1 };

  componentDidMount() {
    this.fetchPopularFilms();
  }

  fetchPopularFilms = async () => {
    const { pageNamber } = this.state;
    const { results } = await ApiMovies.fetchPopularMovies({ pageNamber });
    this.setState((prevState) => ({
      films: [...prevState.films, ...results],
      pageNamber: prevState.pageNamber + 1,
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
