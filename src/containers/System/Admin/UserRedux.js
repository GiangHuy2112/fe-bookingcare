import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import userService from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   let res = await userService.getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({ genderArr: res.data });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }
  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      console.log("base64 image: ", base64);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) {
      return;
    }
    this.setState({ isOpen: true });
  };

  handleSaveUser = (e) => {
    e.preventDefault();
    let isValid = this.checkValidateInput();
    if (isValid) {
      let { action } = this.state;
      if (action === CRUD_ACTIONS.CREATE) {
        // fire redux create user
        this.props.createNewUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          gender: this.state.gender,
          roleId: this.state.role,
          positionId: this.state.position,
          avatar: this.state.avatar,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        // fire redux edit user
        this.props.editAUserRedux({
          id: this.state.userEditId,
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          gender: this.state.gender,
          roleId: this.state.role,
          positionId: this.state.position,
          avatar: this.state.avatar,
        });
      }
    }
  };

  checkValidateInput = () => {
    let arrCheck = [
      "email",
      "password",
      "phoneNumber",
      "address",
      "firstName",
      "lastName",
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]] || !this.state[arrCheck[i]].trim()) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = Buffer.from(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
      previewImgURL: imageBase64,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let { language } = this.props;
    let isLoadingGender = this.props.isLoadingGender;

    let {
      email,
      password,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
      firstName,
      lastName,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">
          <div className="text-center">User Redux GH</div>
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isLoadingGender ? "Loading genders" : ""}
              </div>
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputEmail" className="form-label">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    value={email}
                    onChange={(e) => this.onChangeInput(e, "email")}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword" className="form-label">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => this.onChangeInput(e, "password")}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputFirstName" className="form-label">
                    <FormattedMessage id="manage-user.firstName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstName"
                    value={firstName}
                    onChange={(e) => this.onChangeInput(e, "firstName")}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLastName" className="form-label">
                    <FormattedMessage id="manage-user.lastName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLastName"
                    value={lastName}
                    onChange={(e) => this.onChangeInput(e, "lastName")}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPhoneNumber" className="form-label">
                    <FormattedMessage id="manage-user.phoneNumber" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => this.onChangeInput(e, "phoneNumber")}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputAddress" className="form-label">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    value={address}
                    onChange={(e) => this.onChangeInput(e, "address")}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputGender" className="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    id="inputGender"
                    className="form-select"
                    onChange={(e) => {
                      this.onChangeInput(e, "gender");
                    }}
                    value={gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((gender, index) => {
                        return (
                          <option key={index} value={gender.keyMap}>
                            {language === LANGUAGES.VI
                              ? gender.valueVi
                              : gender.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputPosition" className="form-label">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    id="inputPosition"
                    className="form-select"
                    onChange={(e) => {
                      this.onChangeInput(e, "position");
                    }}
                    value={position}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((position, index) => {
                        return (
                          <option key={index} value={position.keyMap}>
                            {language === LANGUAGES.VI
                              ? position.valueVi
                              : position.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputRoleID" className="form-label">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    id="inputRoleID"
                    className="form-select"
                    onChange={(e) => {
                      this.onChangeInput(e, "role");
                    }}
                    value={role}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((role, index) => {
                        return (
                          <option key={index} value={role.keyMap}>
                            {language === LANGUAGES.VI
                              ? role.valueVi
                              : role.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputImage" className="form-label">
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(e) => this.handleOnChangeImage(e)}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      Tải ảnh <i class="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImgURL})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={(e) => this.handleSaveUser(e)}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
                <div className="col-12 mb-5">
                  <TableManageUser
                    handleEditUserFromParent={this.handleEditUserFromParent}
                    action={this.state.action}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
