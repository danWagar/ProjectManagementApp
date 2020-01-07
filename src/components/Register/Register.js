import React from "react";
import { withFirebase } from "../../services/index";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
};

const RegisterPage = () => (
  <div>
    <h1>Register</h1>
    <RegisterForm />
  </div>
);

class RegisterFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    const { email, password, confirmPassword, error } = this.state;
    const isInvalid =
      password !== confirmPassword || password === "" || email === "";
    return (
      <div className="login-form-container">
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <label htmlFor="email">email: </label>
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="email"
              placeholder="Email Address"
              required
            />
            <label htmlFor="password">password: </label>
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="password"
              minLength="8"
              maxLength="12"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
            />
            <label htmlFor="confirm-password">confirm-password: </label>
            <input
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onChange}
              type="password"
              placeholder="confirm password"
              minLength="8"
              maxLength="12"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
            />
            <button disabled={isInvalid} type="submit">
              Register
            </button>
          </fieldset>
          {error && <p>{error.message}</p>}
        </form>
        <div>
          <h3>Password Requirements</h3>
          <p>At least 1 Uppercase</p>
          <p>At least 1 Lowercase,</p>
          <p>At least 1 Number,</p>
          <p>At least 1 Symbol: !@#$%^&*_=+-,</p>
          <p>Min 8 chars and Max 12 chars</p>
        </div>
      </div>
    );
  }
}

const RegisterLink = () => (
  <p>
    Don't have an account? <Link to="/register">Sign Up</Link>
  </p>
);

const RegisterForm = compose(withRouter, withFirebase)(RegisterFormBase);

export default RegisterPage;

export { RegisterForm, RegisterLink };
