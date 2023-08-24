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
    this.showArtistAlbum();
  }

  showArtistAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await musicAPI(id);
    const tracks = result.filter((track) => Object.values(track).includes('song'));
    this.setState({ albums: result[0], tracks });
    return result;
  };

  render() {
    const { albums, tracks } = this.state;
    const { location } = this.props;
    return (
      <div data-testid="page-album">
        <Header searchRoute={ location.pathname } />
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col mt-32">
            <img
              src={ albums.artworkUrl100 }
              alt={ albums.collectionName }
              className="w-80 h-45"
            />
            <p
              data-testid="album-name"
              className="mt-2 text-2xl font-bold"
            >
              {albums.collectionName}
            </p>
            <p data-testid="artist-name" className="text-lg mt-2">{albums.artistName}</p>
          </div>
          <div className="flex flex-col mt-28">
            {tracks.map((track) => (<MusicCard
              key={ track.trackId }
              music={ track }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
              getMusic={ this.showArtistAlbum }
            />))}
          </div>
        </div>
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
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Album;
