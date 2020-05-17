import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { auth as authActions } from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';
import styles from './styles.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
    isSignUp: true,
  };

  componentDidMount() {
    if (this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.setAuthRedirectPath('/');
    }
  }

  switchAuthModeHandler = () => {
    this.setState(({ isSignUp: prevIsSignUp }) => ({
      isSignUp: !prevIsSignUp,
    }));
  };

  handleOnChange = id => event => {
    const updatedControl = updateObject(this.state.controls[id], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.controls[id].validation,
      ),
      touched: true,
    });
    const updatedControls = updateObject(this.state.controls, {
      [id]: updatedControl,
    });
    let formIsValid = true;
    for (let inputId in updatedControls) {
      formIsValid = updatedControls[inputId].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid });
  };

  submitHandler = event => {
    event.preventDefault();
    const {
      controls: {
        email: { value: email },
        password: { value: password },
      },
      isSignUp,
    } = this.state;
    this.props.auth(email, password, isSignUp);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map(({ id, config }) => (
      <Input
        key={id}
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        touched={config.touched}
        valid={config.valid}
        shouldValidate={config.validation}
        value={config.value}
        onChange={this.handleOnChange(id)}
      />
    ));

    let errorMessage = null;

    if (this.props.loading) {
      form = <Spinner />;
    }

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={styles.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button disabled={!this.state.formIsValid || this.props.loading}>
            SUBMIT
          </Button>
        </form>
        <Button btnStyle="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: { loading, error, token, authRedirectPath },
  burgerBuilder: { building },
}) => ({
  error,
  loading,
  isAuthenticated: token !== null,
  buildingBurger: building,
  authRedirectPath,
});

export default connect(mapStateToProps, authActions)(Auth);
