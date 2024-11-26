import React, { Component } from "react";
import axios from "axios";
import { MDBCard } from "mdb-react-ui-kit";

const emailRegex = RegExp(
  /^[a-z0-9.!#$%&â€™+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)$/
);

const phoneRegex = RegExp(/^[0-9]{10,15}$/);

const charRegex = RegExp(/^[a-zA-Z]{1,50}$/);

const nicRegex = RegExp(/^[0-9+v]{10,12}$/);

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class Performance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nic: "",
      gender: "",
      contactNo: "",
      email: "",
      empId: "",
      joinDate: "",
      dueDate: "",
      dept: "",
      designation: "",
      monthRating: "",
      overallRating: "",
      overallmonths: "",
      performance: "",

      formErrors: {
        name: "",
        email: "",
        contactNo: "",
        nic: "",
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "contactNo":
        formErrors.contactNo = phoneRegex.test(value)
          ? ""
          : "invalid contact number";
        break;
      case "nic":
        formErrors.nic = nicRegex.test(value) ? "" : "invalid Nic number";
        break;
      case "name":
        formErrors.name = charRegex.test(value) ? "" : "invalid name!";
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

  generateOverallRating = (e) => {
    e.preventDefault();

    const {
      name,
      nic,
      gender,
      contactNo,
      email,
      empId,
      joinDate,
      dueDate,
      dept,
      designation,
      monthRating,
      overallRating,
      overallmonths,
      performance,
    } = this.state;
    this.setState({
      overallRating:
        parseInt(this.state.monthRating) + parseInt(this.state.overallRating),
    });
  };

  generatePerformance = (e) => {
    e.preventDefault();

    const {
      name,
      nic,
      gender,
      contactNo,
      email,
      empId,
      joinDate,
      dueDate,
      dept,
      designation,
      monthRating,
      overallRating,
      overallmonths,
      performance,
    } = this.state;
    this.setState({
      performance:
        parseInt(this.state.overallRating) /
          parseInt(this.state.overallmonths) +
        "/10",
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      const id = this.props.match.params.id;
      const {
        name,
        nic,
        gender,
        contactNo,
        email,
        empId,
        joinDate,
        dueDate,
        dept,
        designation,
        monthRating,
        overallmonths,
        overallRating,
        performance,
      } = this.state;

      const data = {
        name: name,
        nic: nic,
        contactNo: contactNo,
        email: email,
        gender: gender,
        empId: empId,
        joinDate: joinDate,
        dueDate: dueDate,
        dept: dept,
        designation: designation,
        monthRating: monthRating,
        overallRating: overallRating,
        overallmonths: overallmonths,
        performance: performance,
      };

      console.log(data);

      axios.put(`/employee/update/${id}`, data).then((res) => {
        let path = "/EmpData";
        if (res.data.success) {
          alert("Add Employee Performance Successfully!");
          this.props.history.push(path);
          this.setState({
            name: "",
            nic: "",
            gender: "",
            contactNo: "",
            email: "",
            empId: "",
            joinDate: "",
            dueDate: "",
            dept: "",
            designation: "",
            monthRating: "",
            overallRating: "",
            overallmonths: "",
            performance: "",
          });
        }
      });
    } else {
      console.error("Form Invalid");
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/employee/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          name: res.data.post.name,
          nic: res.data.post.nic,
          contactNo: res.data.post.contactNo,
          email: res.data.post.email,
          gender: res.data.post.gender,
          empId: res.data.post.empId,
          joinDate: res.data.post.joinDate,
          dueDate: res.data.post.dueDate,
          dept: res.data.post.dept,
          designation: res.data.post.designation,
          monthRating: res.data.post.monthRating,
          overallRating: res.data.post.overallRating,
          overallmonths: res.data.post.overallmonths,
          performance: res.data.post.performance,
        });

        console.log(this.state.post);
      }
    });
  }

  render() {
    const { formErrors } = this.state;
    return (
      <div className="back fixed" style={{ zIndex: 8 }}>
        <br />
        <div className="com-md-8 mt-4 mx-auto">
          <br /> <br />
          <a href="/home">
            <i class="fa fa-home fa-10x"></i>
          </a>
          <center>
            <h1>
              <span class="badge bg-dark text-light opacity-90 fs-1">
                Employee Performance
              </span>
            </h1>
          </center>
          <center>
            <br />
            <MDBCard
              className="text-black mb-3"
              style={{
                maxWidth: "40rem",
                backgroundColor: "rgba(52, 52, 52, 0.4)",
              }}
            >
              <div className="col-md-9 mt-4 mx-auto">
                <br />
                <form>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>EmpID</b>
                    </label>
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      name="empId"
                      placeholder="EX:WL_xxxxxxxxx"
                      value={this.state.empId}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Employee Name</b>
                    </label>
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      name="name"
                      placeholder="Name with Initials"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                    {formErrors.name.length != 10 && (
                      <span className="errorMessage">{formErrors.name}</span>
                    )}
                  </div>

                  <br />

                  <h4>
                    <span class="badge bg-dark text-light opacity-90 fs-1">
                      Performance Calculation
                    </span>
                  </h4>
                  <br />

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>This Month Rating (Out of 10)</b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="monthRating"
                      placeholder=""
                      value={this.state.monthRating}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Overall Rating</b>
                    </label>
                    <table>
                      <th>
                        <input
                          readOnly
                          type="text"
                          className="form-control"
                          name="overallRating"
                          placeholder=""
                          value={this.state.overallRating}
                          onChange={this.handleInputChange}
                        />
                      </th>
                      <th>
                        <button
                          className="btn btn-info"
                          type="submit"
                          style={{ marginTop: "-5px", marginRight: "30px" }}
                          onClick={this.generateOverallRating}
                        >
                          <i className="far far-check-square"></i>
                          &nbsp; Generate
                        </button>
                      </th>
                    </table>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Number of Months Worked</b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="overallmonths"
                      placeholder="Select"
                      value={this.state.overallmonths}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Performance</b>
                    </label>
                    <table>
                      <th>
                        <input
                          readOnly
                          type="text"
                          className="form-control"
                          name="performance"
                          placeholder=""
                          value={this.state.performance}
                          onChange={this.handleInputChange}
                        />
                      </th>
                      <th>
                        <button
                          className="btn btn-info"
                          type="submit"
                          style={{ marginTop: "-5px", marginRight: "30px" }}
                          onClick={this.generatePerformance}
                        >
                          <i className="far far-check-square"></i>
                          &nbsp; Generate
                        </button>
                      </th>
                    </table>
                  </div>

                  <center>
                    <button
                      className="btn btn-dark"
                      type="submit"
                      style={{ marginTop: "15px" }}
                      onClick={this.onSubmit}
                    >
                      <i className="far far-check-square"></i>
                      &nbsp; Add Performance
                    </button>
                  </center>
                  <br />
                  <br />
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
