import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  state = {
    login: '',
    disable: true,
    loading: false,
  };

  handleChange = (event) => {
    const isValid = 3;
    this.setState({ login: event.target.value,
      disable: event.target.value.length < isValid,
    });
  };

  handleSubmit = async () => {
    const { login } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: login });
    history.push('search');
  };

  render() {
    const { login, disable, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Carregando /> : (
          <form>
            <label htmlFor="login">
              <input
                type="text"
                name="login"
                onChange={ this.handleChange }
                value={ login }
                id="login"
                data-testid="login-name-input"
              />
            </label>
            <button
              type="button"
              disabled={ disable }
              data-testid="login-submit-button"
              onClick={ () => this.handleSubmit() }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
