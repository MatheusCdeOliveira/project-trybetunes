import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    tracks: [],
    albums: {},
  };

  componentDidMount() {
    this.ShowArtistAlbum();
  }

  ShowArtistAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await musicAPI(id);
    const tracks = result.filter((track) => Object.values(track).includes('song'));
    this.setState({ albums: result[0], tracks });
    return result;
  };

  render() {
    const { albums, tracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{albums.artistName}</p>
        <p data-testid="album-name">{albums.collectionName}</p>
        {tracks.map((track) => (<MusicCard
          key={ track.trackId }
          trackName={ track.trackName }
          previewUrl={ track.previewUrl }
          trackId={ track.trackId }
          getMusic={ this.ShowArtistAlbum }
        />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
