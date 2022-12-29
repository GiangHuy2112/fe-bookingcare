import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import userService from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let res = await userService.getAllUsers("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUsers: res.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };

  toggleUserEditModal = () => {
    this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
  };

  createNewUser = async (data) => {
    try {
      let res = await userService.createNewUserService(data);
      console.log(">>> check res", res);
      if (res && res.message.errCode !== 0) {
        alert(res.message.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
    console.log(">>> check data: ", data);
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await userService.deleteUserService(user.id);
      if (res && res.message.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.message.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
    console.log("delete user: ", user);
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await userService.editUserService(user);
      if (res && res.message.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });

        this.getAllUsersFromReact();
      } else {
        alert(res.message.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser
          isOpenModalUsers={this.state.isOpenModalUser}
          toggleUserModal={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpenModalUsers={this.state.isOpenModalEditUser}
            toggleUserModal={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title">Manage users with Giang Huy</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>
            <span className="ms-2">Add new user</span>
          </button>
        </div>
        <div className="user-table mt-4 mx-3">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(user)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(user)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
