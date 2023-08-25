import React from 'react';
import PropTypes from 'prop-types';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    const response = await getFavoriteSongs();
    response.forEach((song) => {
      if (song.trackId === trackId) {
        this.setState({ isChecked: true });
      }
    });
  };

  handleFavorite = async () => {
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
    const { trackName, previewUrl, trackId, image, favoriteRoute } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <div id="track-div" className="flex ml-5 mt-5">
        {favoriteRoute ? <img
          src={ image }
          alt="Album img"
          className="mr-5"
          width="100px"
        /> : ''}
        <h3 className="mt-4 mr-4">{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        { isLoading ? <Carregando /> : (
          <label
            data-testid={ `checkbox-music-${trackId}` }
            htmlFor={ trackId }
            className="mt-4 ml-4"
          >
            { isChecked ? <MdFavorite className="text-red-600 text-2xl" />
              : <MdFavoriteBorder className="text-2xl" /> }
            <input
              className="hidden"
              type="checkbox"
              name="favorite"
              id={ trackId }
              onChange={ this.handleFavorite }
              checked={ isChecked }
            />
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
