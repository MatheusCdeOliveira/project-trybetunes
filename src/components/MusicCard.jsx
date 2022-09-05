import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
    isLoading: false,
  };

  addFavorite = async (event) => {
    const { getMusic, trackName } = this.props;
    this.setState({ isLoading: true });
    const musics = await getMusic();
    const musicaFavoritada = musics.find((music) => music.trackName === trackName);
    await addSong(musicaFavoritada);
    this.setState({ isLoading: false, isChecked: event.target.checked });
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
                onClick={ this.addFavorite }
                defaultChecked={ isChecked }
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
