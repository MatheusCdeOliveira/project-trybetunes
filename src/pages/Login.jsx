/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
// import '../style/login.css';

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
          <div
            className="input-login flex
            items-center py-28 px-4
             sm:px-6 lg:px-8 flex-col h-screen"
          >
            <div />
            <h1 className="xl:text-green-600 drop-shadow-md lg:text-7xl ">TrybeTunes</h1>
            <img src="../tunes.jpg" alt="" />
            <div
              className="form flex w-auto mt-44 h-80 bg-gray-100
             rounded-lg absolute"
            >
              <form className="m-auto p-20">
                <div className="rounded-md shadow-sm w-96">
                  <label htmlFor="login" className="">
                    <input
                      className="
                     appearance-none rounded-none rounded-t-md border
                      border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500
                      focus:z-10 focus:border-indigo-500
                      focus:outline-none focus:ring-indigo-500
                      sm:text-sm w-full"
                      type="text"
                      placeholder="Your name"
                      name="login"
                      onChange={ this.handleChange }
                      value={ login }
                      id="login"
                      data-testid="login-name-input"
                    />
                  </label>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full
                     justify-center rounded-md border border-transparent
                     bg-blue-700 py-2 px-4 text-sm font-medium text-white
                     hover:bg-green-600
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     focus:ring-offset-2"
                      disabled={ disable }
                      data-testid="login-submit-button"
                      onClick={ () => this.handleSubmit() }
                    >
                      Enter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
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
