import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { userService } from "../../services";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: "",
    };
  }

  handleOnChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async () => {
    this.setState({ errMessage: "" });
    try {
      let data = await userService.handleLogin(
        this.state.username,
        this.state.password
      );
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login successed");
      }
      console.log(data);
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({ errMessage: e.response.data.message });
        }
      }
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username..."
                value={this.state.username}
                onChange={(e) => this.handleOnChangeUsername(e)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password..."
                value={this.state.password}
                onChange={(e) => this.handleOnChangePassword(e)}
                onKeyDown={(e) => this.handleKeyDown(e)}
              />
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="text-center">
              <button className="btn-login" onClick={() => this.handleSubmit()}>
                Log in
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or login in with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google-icon"></i>
              <i className="fab fa-facebook-f facebook-icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
