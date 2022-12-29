import axios from "axios";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./ModalUser.scss";
import { emitter } from "../../utils";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      gender: "1",
      roleId: "R1",
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      // Reset state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        gender: "1",
        roleId: "R1",
      });
    });
    emitter.off("EVENT_CLEAR_MODAL_DATA", () => {
      // Reset state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        gender: "1",
        roleId: "R1",
      });
    });
  };

  componentDidMount() {
    console.log();
  }

  toggle = () => {
    this.props.toggleUserModal();
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = async () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      // Call Api create modal
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        className="modal-user-container"
        isOpen={this.props.isOpenModalUsers}
        toggle={() => this.toggle()}
        centered
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()} className="modal-user-header">
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email:</label>
              <input
                type="text"
                value={this.state.email}
                onChange={(e) => {
                  this.handleOnChangeInput(e, "email");
                }}
              />
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input
                type="password"
                value={this.state.password}
                onChange={(e) => {
                  this.handleOnChangeInput(e, "password");
                }}
              />
            </div>
            <div className="input-container">
              <label>First Name:</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(e) => {
                  this.handleOnChangeInput(e, "firstName");
                }}
              />
            </div>
            <div className="input-container">
              <label>Last Name:</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(e) => {
                  this.handleOnChangeInput(e, "lastName");
                }}
              />
            </div>
            <div className="input-container">
              <label>Address:</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(e) => {
                  this.handleOnChangeInput(e, "address");
                }}
              />
            </div>
            <div className="input-container">
              <label htmlFor="gender">Sex</label>
              <select
                id="gender"
                name="gender"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "gender");
                }}
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div
              className="input-container"
              onChange={(e) => {
                this.handleOnChangeInput(e, "roleId");
              }}
            >
              <label htmlFor="roleId">Role</label>
              <select id="roleId" name="roleId">
                <option value="R1">Admin</option>
                <option value="R2">Doctor</option>
                <option value="R3">Patient</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleAddNewUser()}
          >
            Add new
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
