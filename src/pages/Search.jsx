import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistName: '',
    enabled: true,
  };

  handleInputChange = (event) => {
    const MIN_CHARACTER = 2;
    const { value } = event.target;
    this.setState({ artistName: value, enabled: (value.length < MIN_CHARACTER) });
  };

  render() {
    const { artistName, enabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              value={ artistName }
              onChange={ this.handleInputChange }
              type="text"
              name="search"
              id=""
            />
          </label>
          <button
            type="button"
            disabled={ enabled }
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
