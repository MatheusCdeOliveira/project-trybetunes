import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import profileImg from '../TrybeTunes-Figma/icon/avatar/icon/action/default.png';

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
          <div className="m-auto w-96 flex flex-col mt-16">
            <div className="flex justify-between w-full pl-4">
              <img
                className="rounded-full h-20"
                src={ user.image || profileImg }
                width="80px"
                data-testid="profile-image"
                alt={ user.image }
              />
              <Link
                className="m-auto text-center
                 text-base font-bold rounded-lg border-blue-400
                 text-blue-400 w-28 h-8 p-0 border-2"
                to="/profile/edit"
              >
                Editar Perfil

              </Link>
            </div>
            <h2 className="mt-5 pl-4 text-opacity-90 text-2xl text-gray-700 font-bold">
              Nome
            </h2>
            <p className="pl-4 text-lg">{user.name}</p>
            <h2 className="mt-5 pl-4 text-opacity-90 text-2xl text-gray-700 font-bold">
              E-mail
            </h2>
            <p className="pl-4 text-lg">{user.email}</p>
            <h2 className="mt-5 pl-4 text-opacity-90 text-2xl text-gray-700 font-bold">
              Descrição
            </h2>
            <p className="pl-4 text-lg break-all pr-20">{user.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
