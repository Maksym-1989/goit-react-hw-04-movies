import React, { Component } from "react";
import FilmsList from "../../components/filmsList/FilmsList";
import SearchForm from "../../components/searchForm/SearchForm";
import ApiMovies from "../../api/movies-api";
import Section from "../../components/section/Section";

class MoviesPage extends Component {
  state = { searchQuery: "", films: [] };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search).get("query");
    if (query) this.setState({ searchQuery: query });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchFilmsWidthQuery();
    }
  }

  fetchFilmsWidthQuery = async () => {
    const { searchQuery } = this.state;

    if (!searchQuery) {
      return;
    }
    const { results } = await ApiMovies.fetchSearchMovies({ searchQuery });
    this.setState({ films: [...results] });
  };

  changeQuery = (query) => {
    this.setState({
      searchQuery: query,
      films: [],
    });

    const { history, location } = this.props;

    history.push({
      ...location,
      search: `query=${query}`,
    });
  };
  render() {
    const { films } = this.state;
    return (
      <div>
        <SearchForm onSubmit={this.changeQuery} />
        {films.length !== 0 && (
          <Section title="Found according to your request">
            <FilmsList films={films} />
          </Section>
        )}
      </div>
    );
  }
}

export default MoviesPage;
