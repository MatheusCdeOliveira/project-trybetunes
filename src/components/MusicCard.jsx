import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
    isLoading: false,
  };

  componentDidMount() {
    this.recoverFavorite();
  }

  recoverFavorite = async () => {
    const { trackId } = this.props;
    this.setState({ isLoading: true });
    const response = await getFavoriteSongs();
    this.setState({ isLoading: false });
    response.forEach((song) => {
      if (song.trackId === trackId) {
        this.setState({ isChecked: true });
      }
    });
  };

  addFavorite = async () => {
    const { getMusic, trackName } = this.props;
    this.setState({ isLoading: true });
    const musics = await getMusic();
    const musicaFavoritada = musics.find((music) => music.trackName === trackName);
    await addSong(musicaFavoritada);
    this.setState({ isLoading: false, isChecked: true });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <div id="track-div">
        {isLoading ? <Carregando /> : (
          <>
            { trackName }
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                name="favorite"
                id={ trackId }
                onChange={ this.addFavorite }
                checked={ isChecked }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
