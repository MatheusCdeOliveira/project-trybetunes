/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import imagem from './Group1.png';
// import avatar from '../TrybeTunes-Figma/icon/avatar/icon/action/Path.png';
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
    return (
      <header data-testid="header-component" className="">
        {loading ? <Carregando /> : (
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
                {user.name}

              </p>
            </div>
          </div>
        )}
        <nav className="header-route">
          <ul className="flex flex-row bg-gray-200">
            <li
              className="bg-verdin font-bold text-gray-50
             w-2/4 h-[78px] text-3xl leading-7 not-italic
              text-center flex justify-center items-center"
            >
              <Link data-testid="link-to-search" to="/search">Search</Link>
            </li>
            <div className="flex items-center justify-evenly bg-#F0F2F5 w-full">
              <li className="text-#2FC18C w-[137px] h-9 text-3xl font-bold">
                <Link
                  data-testid="link-to-favorites"
                  to="/favorites"
                  className=""
                >
                  Favorites
                </Link>

              </li>
              <li
                className="text-#2FC18C
               w-[137px] h-9 text-3xl font-bold"
              >
                <Link data-testid="link-to-profile" to="/profile">Profile</Link>

              </li>
            </div>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
