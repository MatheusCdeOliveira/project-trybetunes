import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import '../style/header.css';

class Search extends React.Component {
  state = {
    artist: '',
    album: '',
    enabled: true,
    requestAlbum: false,
    albums: [],
  };

  handleInputChange = (event) => {
    const MIN_CHARACTER = 2;
    const { value } = event.target;
    this.setState({
      album: value,
      artist: value,
      enabled: (value.length < MIN_CHARACTER) });
  };

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({ requestAlbum: true });
    const result = await searchAlbumsAPI(artist);
    this.setState({
      requestAlbum: false, artist: '', albums: [...result] });
  };

  render() {
    const { artist, enabled, requestAlbum, album, albums } = this.state;
    const { location } = this.props;
    return (
      <div data-testid="page-search">
        <Header searchRoute={ location.pathname } />
        {requestAlbum ? <Carregando /> : (
          <form>
            <label htmlFor="search">
              <input
                className="search-input"
                data-testid="search-artist-input"
                value={ artist }
                onChange={ this.handleInputChange }
                type="text"
                name="search"
                id=""
              />
            </label>
            <div className="search-btn">
              <button
                className="text-white text-base font-normal"
                type="button"
                disabled={ enabled }
                onClick={ this.handleClick }
                data-testid="search-artist-button"
              >
                Pesquisar

              </button>
            </div>
            {album && (
              <h2 className="text-2xl font-light ml-5">
                { `Resultado de álbuns de: ${artist}` }
              </h2>
            )}
          </form>)}
        { !albums.length ? <p className="text-lg">Nenhum álbum foi encontrado</p> : (
          <div className="flex flex-col flex-wrap justify-center">
            <ul className="">
              <div className="flex flex-row flex-wrap w-73">
                {albums
                  .map((alb) => (
                    <div
                      key={ alb.collectionId }
                      className="album-card flex flex-col
                      justify-center w-72 ml-5 mt-10 m-auto"
                    >
                      <div className="flex flex-col">
                        <img
                          src={ alb.artworkUrl100 }
                          alt={ alb.collectionName }
                          className="w-72 h-45"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="ml-5 text-lg font-bold mt-5">
                          {alb.collectionName}
                        </h1>
                        <Link
                          data-testid={ `link-to-album-${alb.collectionId}` }
                          to={ `/album/${alb.collectionId}` }
                          className="mt-5 ml-5 h-20 text-xs font-normal leading-4"
                        >
                          Album

                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  pathanme: PropTypes.string,
}.isRequired;

export default Search;
