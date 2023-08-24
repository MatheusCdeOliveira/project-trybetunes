import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    favoritedSongs: [],
  };

  async componentDidMount() {
    const response = await getFavoriteSongs();
    this.setState({ favoritedSongs: response });
  }

  async componentDidUpdate() {
    const response = await getFavoriteSongs();
    this.setState({ favoritedSongs: response });
  }

  render() {
    const { favoritedSongs } = this.state;
    const { location } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header favoriteRoute={ location.pathname } />
        <div className="pl-32">
          <h2 className="text-lg font-bold p-8">Músicas favoritas:</h2>
          {favoritedSongs.map((song) => (<MusicCard
            key={ song.trackId }
            music={ song }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
            favoriteRoute={ location.pathname }
            image={ song.artworkUrl100 }
          />))}
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  pathanme: PropTypes.string,
}.isRequired;

export default Favorites;
