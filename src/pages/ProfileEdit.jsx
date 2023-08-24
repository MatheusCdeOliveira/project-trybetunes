import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';
import profileImg from '../TrybeTunes-Figma/icon/avatar/icon/action/default.png';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    image: '',
    name: '',
    email: '',
    description: '',
  };

  async componentDidMount() {
    const { image, name, email, description } = await getUser();
    this.setState({ image, name, email, description });
  }

  handleInputs = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { image, name, email, description } = this.state;
    const { history } = this.props;
    updateUser({ image, name, email, description });
    history.push('/profile');
  };

  render() {
    const { loading, image, name, email, description } = this.state;
    const { location } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header profileRoute={ location.pathname } />
        {loading ? <Carregando /> : (
          <form action="">
            <div className="m-auto w-96 flex flex-col mt-16">
              <div className="flex justify-between items-end w-full">
                <img
                  className="rounded-full h-20"
                  src={ image || profileImg }
                  width="80px"
                  data-testid="profile-image"
                  alt={ image }
                />
                <label htmlFor="image">
                  <input
                    type="text"
                    name="image"
                    className="h-9 rounded-sm border border-gray-200"
                    value={ image }
                    onChange={ this.handleInputs }
                    placeholder="Insira um Link"
                    id=""
                  />
                </label>
              </div>
              <div className="w-96 h-[87px] gap-2 mt-10">
                <label
                  htmlFor="name"
                  className="w-72 h-10 mt-5 text-opacity-90
                 text-2xl text-gray-700 font-bold"
                >
                  Nome
                  <p
                    className="text-base text-gray-600 font-normal
                   italic text-opacity-70"
                  >
                    Digite seu nome
                  </p>
                  <input
                    type="text"
                    className="w-full h-9 border-b text-gray-700 text-opacity-100
                     text-lg font-normal border-gray-500 bg-gray-100"
                    onChange={ this.handleInputs }
                    value={ name }
                    name="name"
                    id=""
                  />
                </label>
              </div>
              <div className="w-96 h-[87px] gap-2 mt-10">
                <label
                  htmlFor="email"
                  className="w-72 h-10 mt-5 text-opacity-90
                 text-2xl text-gray-700 font-bold"
                >
                  Email
                  <p
                    className="text-base text-gray-600 font-normal
                   italic text-opacity-70"
                  >
                    Escolha um email que consulte diariamente
                  </p>
                  <input
                    type="email"
                    onChange={ this.handleInputs }
                    value={ email }
                    placeholder="exemplo123@gmail.com"
                    className="w-full h-9 border-b text-gray-700 text-opacity-100
                    text-sm font-normal border-gray-500 bg-gray-100"
                    name="email"
                    id="email"
                  />
                </label>
              </div>
              <p id="result" />
              <div className="w-96 mt-10">
                <label
                  htmlFor="description"
                  className="w-72 h-10 mt-5 text-opacity-90
                 text-2xl text-gray-700 font-bold"
                >
                  Descrição
                  <p
                    className="text-base text-gray-600 font-normal
                   italic text-opacity-70"
                  >
                    Sobre você
                  </p>
                  <textarea
                    name="description"
                    id=""
                    className="w-full h-20 border-b text-gray-700 text-opacity-100
                    text-lg font-normal border-gray-500 bg-gray-100"
                    onChange={ this.handleInputs }
                    value={ description }
                    cols="24"
                    rows="2"
                  />
                </label>
                <button
                  type="button"
                  disabled={
                    !image || !name || !email || !description
                  }
                  onClick={ this.handleSubmit }
                  className="flex w-28 h-10 justify-center items-center
                  m-auto mt-10 rounded-sm profileEditBtn text-white hover:bg-opacity-80"
                >
                  Enviar

                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ProfileEdit;
