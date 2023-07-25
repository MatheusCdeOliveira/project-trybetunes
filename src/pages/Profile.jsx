import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  state = {
    loading: false,
    user: {},
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Carregando /> : (
          <div>
            <img
              src={ user.image }
              width="200px"
              data-testid="profile-image"
              alt={ user.image }
            />
            <Link
              to="/profile/edit"
            >
              Editar Perfil

            </Link>
            <h2>
              Nome
            </h2>
            <p>{user.name}</p>
            <h2>
              Email
              <p>{user.email}</p>
            </h2>
            <h2>
              Descrição
              <p>{user.description}</p>
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
