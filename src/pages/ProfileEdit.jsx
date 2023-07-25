import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';

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
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Carregando /> : (
          <form action="">
            <div>
              <label htmlFor="image">
                <input
                  type="text"
                  name="image"
                  value={ image }
                  onChange={ this.handleInputs }
                  placeholder="Insira um Link"
                  id=""
                />
              </label>
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  onChange={ this.handleInputs }
                  value={ name }
                  name="name"
                  id=""
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  onChange={ this.handleInputs }
                  value={ email }
                  name="email"
                  id="email"
                />
              </label>
              <p id="result" />
              <label htmlFor="description">
                Descrição
                <textarea
                  name="description"
                  id=""
                  onChange={ this.handleInputs }
                  value={ description }
                  cols="30"
                  rows="10"
                />
              </label>
              <button
                type="button"
                disabled={
                  !image || !name || !email || !description
                }
                onClick={ this.handleSubmit }
              >
                Enviar

              </button>
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
};

export default ProfileEdit;
