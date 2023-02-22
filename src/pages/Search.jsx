import React from 'react';
import { Link } from 'react-router-dom';
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
    return (
      <div data-testid="page-search">
        <Header />
        {requestAlbum ? <Carregando /> : (
          <form>
            <label htmlFor="search">
              <input
                data-testid="search-artist-input"
                value={ artist }
                onChange={ this.handleInputChange }
                type="text"
                name="search"
                id=""
              />
            </label>
            <button
              type="button"
              disabled={ enabled }
              onClick={ this.handleClick }
              data-testid="search-artist-button"
            >
              Pesquisar

            </button>
          </form>)}
        {album && (
          <h2>
            { `Resultado de álbuns de: ${album}` }
          </h2>
        )}
        { !albums.length ? <p>Nenhum álbum foi encontrado</p> : (
          <div>
            <ul>
              {albums
                .map((alb) => (
                  <div key={ alb.collectionId }>
                    <img src={ alb.artworkUrl100 } alt={ alb.collectionName } />
                    <p>{alb.collectionName}</p>
                    <Link
                      data-testid={ `link-to-album-${alb.collectionId}` }
                      to={ `/album/${alb.collectionId}` }
                    >
                      Album

                    </Link>
                  </div>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
