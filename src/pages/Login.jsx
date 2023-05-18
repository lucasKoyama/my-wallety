import React from 'react';
import { PropTypes } from 'prop-types';
import { TextField, Button } from '@mui/material';
import './Login.css';
import { connect } from 'react-redux';
import { userLoginData, fetchCurrencies } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleLogin = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(userLoginData(email));
    history.push('/carteira');
    dispatch(fetchCurrencies());
  };

  render() {
    const { email, password } = this.state;
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passValid = 6;
    return (
      <section className="login-section">
        <div className="user-login">
          <p className="title">Faça seu login</p>
          <TextField
            label="Email"
            type="text"
            inputProps={ { 'data-testid': 'email-input' } }
            name="email"
            id="user-email"
            value={ email }
            onChange={ this.handleChange }
            style={ { width: '100%', marginBottom: '10px' } }
          />
          <TextField
            label="Senha"
            type="password"
            inputProps={ { 'data-testid': 'password-input' } }
            name="password"
            id="user-password"
            value={ password }
            onChange={ this.handleChange }
            style={ { width: '100%', marginBottom: '10px' } }
          />
          <Button
            disabled={ !(emailValidation.test(email) && password.length >= passValid) }
            onClick={ () => this.handleLogin() }
            className="login-btn"
          >
            Entrar
          </Button>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf({}),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
