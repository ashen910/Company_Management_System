import React, { Component } from "react";
import axios from "axios";
import { MDBCard } from "mdb-react-ui-kit";

const emailRegex = RegExp(
  /^[a-z0-9.!#$%&â€™+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)$/
);

const phoneRegex = RegExp(/^[0-9]{10,15}$/);

const charRegex = RegExp(/^[a-zA-Z\s]{1,50}$/);

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class CreateDeptData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dCategory: "",
      dName: "",
      dEmail: "",
      dTeams: "",
      hName: "",
      hEmail: "",
      hNo: "",
      uDate: "",

      formErrors: {
        dEmail: "",
        hName: "",
        hEmail: "",
        hNo: "",
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "dEmail":
        formErrors.dEmail = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "hEmail":
        formErrors.hEmail = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "hNo":
        formErrors.hNo = phoneRegex.test(value) ? "" : "invalid contact number";
        break;
      case "hName":
        formErrors.hName = charRegex.test(value) ? "" : "invalid name!";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  btnDemo = (e) => {
    e.preventDefault();

    const { dCategory, dName, dEmail, dTeams, hName, hEmail, hNo, uDate } =
      this.state;

    const data = {
      dCategory: dCategory,
      dName: dName,
      dEmail: dEmail,
      dTeams: dTeams,
      hName: hName,
      hEmail: hEmail,
      hNo: hNo,
      uDate: uDate,
    };
    console.log(data);

    this.setState({
      dCategory: "Technology",
      dName: "Intelligent Automation",
      dEmail: "intelligentautomation@whitelight.com",
      dTeams: "3",
      hName: "R.A.E.Wijenayake",
      hEmail: "ashen910@gmail.com",
      hNo: "0776869123",
      uDate: "2022-09-09",
    });
  };

  btnReset = (e) => {
    e.preventDefault();

    const { dCategory, dName, dEmail, dTeams, hName, hEmail, hNo, uDate } =
      this.state;

    const data = {
      dCategory: dCategory,
      dName: dName,
      dEmail: dEmail,
      dTeams: dTeams,
      hName: hName,
      hEmail: hEmail,
      hNo: hNo,
      uDate: uDate,
    };
    console.log(data);

    this.setState({
      dCategory: "",
      dName: "",
      dEmail: "",
      dTeams: "",
      hName: "",
      hEmail: "",
      hNo: "",
      uDate: "",
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      const { dCategory, dName, dEmail, dTeams, hName, hEmail, hNo, uDate } =
        this.state;

      const data = {
        dCategory: dCategory,
        dName: dName,
        dEmail: dEmail,
        dTeams: dTeams,
        hName: hName,
        hEmail: hEmail,
        hNo: hNo,
        uDate: uDate,
      };

      console.log(data);

      axios.post("/departments/save", data).then((res) => {
        let path = "/DeptData";
        if (res.data.success) {
          alert("Create A New Department Successfully!");
          this.props.history.push(path);
          this.setState({
            dCategory: "",
            dName: "",
            dEmail: "",
            dTeams: "",
            hName: "",
            hEmail: "",
            hNo: "",
            uDate: "",
          });
        }
      });
    } else {
      console.error("Form Invalid");
    }
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="back fixed" style={{ zIndex: 8 }}>
        <br />
        <a href="/home">
          <i class="fa fa-home fa-10x"></i>
        </a>
        <div className="com-md-8 mt-4 mx-auto">
          <br /> <br />
          <center>
            <h1>
              <span class="badge bg-dark text-light opacity-90 fs-1">
                Create A New Department
              </span>
            </h1>
          </center>
          <center>
            <br />
            <MDBCard
              className="text-black mb-3"
              style={{
                maxWidth: "70rem",
                backgroundColor: "rgba(52, 52, 52, 0.4)",
              }}
            >
              <div className="col-md-8 mt-4 mx-auto">
                <br />
                <form>
                  <div className="row">
                    <div className="col">
                      <h4>
                        <span class="badge bg-dark text-light opacity-90 fs-1">
                          Department Information
                        </span>
                      </h4>
                      <br />
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Department Category</b>
                        </label>
                        <select
                          name="dCategory"
                          value={this.state.dCategory}
                          onChange={this.handleInputChange}
                          defaultValue="Select Type"
                          className="form-control"
                        >
                          <option defaultValue>--Select Category--</option>
                          <option value="Technology">Technology</option>
                          <option value="Management">Management</option>
                        </select>
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Department Name</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="dName"
                          placeholder="Give A New Name "
                          value={this.state.dName}
                          onChange={this.handleInputChange}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Department Email</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="dEmail"
                          placeholder="Enter valid Email (xxxxxx@whitelight.com)"
                          value={this.state.dEmail}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.dEmail.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.dEmail}
                          </span>
                        )}
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>No of Teams</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="dTeams"
                          placeholder="(1-10)"
                          value={this.state.dTeams}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col">
                      <h4>
                        <span class="badge bg-dark text-light opacity-90 fs-1">
                          Department Head Information
                        </span>
                      </h4>
                      <br />

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Department Head Name</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="hName"
                          placeholder="Name with Initials"
                          value={this.state.hName}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.hName.length != 10 && (
                          <span style={{ color: "red" }}>
                            {formErrors.hName}
                          </span>
                        )}
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Personal Email</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="hEmail"
                          placeholder="Enter valid Email"
                          value={this.state.hEmail}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.hEmail.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.hEmail}
                          </span>
                        )}
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Contact Number</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="hNo"
                          placeholder="Enter Valid Contact Number (EX:94xxxxxxxxx)"
                          value={this.state.hNo}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.hNo.length > 0 && (
                          <span style={{ color: "red" }}>{formErrors.hNo}</span>
                        )}
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Updated Date</b>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="uDate"
                          placeholder=""
                          value={this.state.uDate}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <center>
                    <button
                      className="btn btn-danger"
                      type="submit"
                      style={{ marginTop: "15px" }}
                      onClick={this.btnReset}
                    >
                      <i className="far far-check-square"></i>
                      &nbsp; Reset All
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-dark"
                      type="submit"
                      style={{ marginTop: "15px" }}
                      onClick={this.onSubmit}
                    >
                      <i className="far far-check-square"></i>
                      &nbsp; Submit
                    </button>
                  </center>
                  <button
                    className="btn btn-warning"
                    type="submit"
                    style={{ marginTop: "15px", marginLeft: "300px" }}
                    onClick={this.btnDemo}
                  >
                    <i className="far far-check-square"></i>
                    &nbsp; <b>Demo</b>
                  </button>{" "}
                  <br /> <br />
                </form>
              </div>
            </MDBCard>
            <br /> <br /> <br /> <br />
          </center>
        </div>
      </div>
    );
  }
}
