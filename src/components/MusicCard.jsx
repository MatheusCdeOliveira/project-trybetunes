import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
    isLoading: false,
    // getFavorite: [],
  };

  componentDidMount() {
    this.recoverFavorite();
  }

  recoverFavorite = async () => {
    const { trackId } = this.props;
    const response = await getFavoriteSongs();
    // this.setState({ getFavorite: [...response] });
    response.forEach((song) => {
      if (song.trackId === trackId) {
        this.setState({ isChecked: true });
      }
    });
  };

  addFavorite = async () => {
    const { music } = this.props;
    const { isChecked } = this.state;
    this.setState({ isLoading: true });
    if (isChecked) {
      await removeSong(music);
      await this.recoverFavorite();
      this.setState({ isChecked: false, isLoading: false });
    } else {
      await addSong(music);
      await this.recoverFavorite();
      this.setState({ isLoading: false, isChecked: true });
    }
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
