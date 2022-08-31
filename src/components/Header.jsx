import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: false,
    username: '',
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    this.setState({ loading: true });
    const result = await getUser();
    this.setState({ loading: false, username: result.name });
  };

  render() {
    const { username, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Carregando /> : <p data-testid="header-user-name">{username}</p> }
        <nav>
          <ul>
            <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
            <li>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favorites
              </Link>

            </li>
            <li><Link data-testid="link-to-profile" to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
