import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import imagem from './Group1.png';
import profileImg from '../TrybeTunes-Figma/icon/avatar/icon/action/default.png';

class Header extends React.Component {
  state = {
    loading: false,
    user: {},
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    this.setState({ loading: true });
    const result = await getUser();
    this.setState({ loading: false, user: result });
  };

  render() {
    const { user, loading } = this.state;
    const { favoriteRoute, searchRoute, profileRoute } = this.props;
    const navSelected = 'bg-verdin text-gray-50';
    const navNotSelected = 'text-#2FC18C';
    return (
      <header data-testid="header-component" className="">
        <div
          className="header-container
            h-24 flex flex-row left-0 top-1.5 w-360"
        >
          <img
            src={ imagem }
            className="h-24 absolute -top-3 left-9"
            width="117px"
            alt="tunes.jpg"
          />
          <div className="header-container-user flex bg-white absolute box-border h-10">
            <img
              src={ user.image || profileImg }
              width="40px"
              alt="profileImg"
              className="rounded-full p-1"
            />
            <p
              data-testid="header-user-name"
              className="p-header h-7 w-36 text-center mt-2 mr-2"
            >
              {!loading ? user.name : 'Carregando...'}

            </p>
          </div>
        </div>
        <nav className="header-route">
          <ul className="flex flex-row bg-gray-200 justify-between w-full">
            <li
              className={ `${searchRoute ? navSelected : navNotSelected}
              font-bold text-gray-50 border-r-4 border-white
              h-[78px] text-3xl leading-7 not-italic
              text-center flex justify-center items-center w-1/3` }
            >
              <Link data-testid="link-to-search" to="/search">Search</Link>
            </li>
            <li
              className={ `${favoriteRoute ? navSelected : navNotSelected} 
              h-[78px] text-3xl font-bold w-1/3 border-r-4 border-white
              text-center flex items-center justify-center` }
            >
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
                className=""
              >
                Favorites
              </Link>

            </li>
            <li
              className={ `${profileRoute ? navSelected : navNotSelected} 
              h-[78px] text-3xl font-bold w-1/3
              text-center flex justify-center items-center` }
            >
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>

            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  searchRoute: PropTypes.string,
  favoriteRoute: PropTypes.string,
  profileRoute: PropTypes.string,
}.isRequired;

export default Header;
