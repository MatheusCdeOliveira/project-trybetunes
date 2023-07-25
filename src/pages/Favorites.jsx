import React from 'react';
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
    return (
      <div data-testid="page-favorites">
        <Header />
        {favoritedSongs.map((song) => (<MusicCard
          key={ song.trackId }
          music={ song }
          trackName={ song.trackName }
          previewUrl={ song.previewUrl }
          trackId={ song.trackId }
        />))}
      </div>
    );
  }
}

export default Favorites;
