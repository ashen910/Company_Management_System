import React, { Component } from "react";
import axios from "axios";
import { MDBCard } from "mdb-react-ui-kit";

const emailRegex = RegExp(
  /^[a-z0-9.!#$%&â€™+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)$/
);

const phoneRegex = RegExp(/^[0-9]{10,15}$/);

const charRegex = RegExp(/^[a-zA-Z]\s{1,50}$/);

const nicRegex = RegExp(/^[0-9+v]{10,12}$/);

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class EditEmpData extends Component {
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
        formErrors.nic = nicRegex.test(value) ? "" : "invalid NIC number";
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
      };

      console.log(data);

      axios.put(`/employee/update/${id}`, data).then((res) => {
        let path = "/EmpData";
        if (res.data.success) {
          alert("Update EMP Data Successfully!");
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
        <a href="/home">
          <i class="fa fa-home fa-10x"></i>
        </a>
        <div className="com-md-8 mt-4 mx-auto">
          <br /> <br />
          <center>
            <h1>
              <span class="badge bg-dark text-light opacity-90 fs-1">
                Edit Employee Information
              </span>
            </h1>
          </center>
          <center>
            <br />
            <MDBCard
              className="text-black mb-3"
              style={{
                maxWidth: "65rem",
                backgroundColor: "rgba(52, 52, 52, 0.4)",
              }}
            >
              <div className="col-md-9 mt-4 mx-auto">
                <br />
                <form>
                  <div className="row">
                    <div className="col">
                      <h4>
                        <span class="badge bg-dark text-light opacity-90 fs-1">
                          Personal Information
                        </span>
                      </h4>
                      <br />
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Employee Name</b>
                        </label>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Full Name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>NIC</b>
                        </label>
                        <input
                          type="text"
                          disabled
                          className="form-control"
                          name="nic"
                          placeholder="Enter NIC"
                          value={this.state.nic}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.nic.length > 0 && (
                          <span style={{ color: "red" }}>{formErrors.nic}</span>
                        )}
                      </div>

                      <div class="form-outline mb-4">
                        <label style={{ marginBottom: "5px" }}>
                          <b>Select Gender</b>
                        </label>
                        <br />
                        <select
                          name="gender"
                          value={this.state.gender}
                          onChange={this.handleInputChange}
                          defaultValue="Select Type"
                          className="form-control"
                        >
                          <option defaultValue>--Select Gender--</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Contact Number</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="contactNo"
                          placeholder="Enter Valid Contact Number (EX:94xxxxxxxxx)"
                          value={this.state.contactNo}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.contactNo.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.contactNo}
                          </span>
                        )}
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Email</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="Enter valid Email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.email.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col">
                      <h4>
                        <span class="badge bg-dark text-light opacity-90 fs-1">
                          Employment Details
                        </span>
                      </h4>
                      <br />

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>EmpID</b>
                        </label>
                        <input
                          type="text"
                          disabled
                          className="form-control"
                          name="empId"
                          placeholder="EX:WL_xxxxxxxxx"
                          value={this.state.empId}
                          onChange={this.handleInputChange}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Join Date</b>
                        </label>
                        <input
                          type="date"
                          disabled
                          className="form-control"
                          name="joinDate"
                          placeholder=""
                          value={this.state.joinDate}
                          onChange={this.handleInputChange}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Due Date</b>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="dueDate"
                          placeholder=""
                          value={this.state.dueDate}
                          onChange={this.handleInputChange}
                        />
                      </div>

                      <div class="form-outline mb-3">
                        <label class="form-label" for="form3Example3">
                          <b>Department</b>
                        </label>
                        <select
                          name="dept"
                          value={this.state.dept}
                          onChange={this.handleInputChange}
                          defaultValue="Select Type"
                          className="form-control"
                        >
                          <option defaultValue>--Select Department--</option>
                          <option value="Intelligent Automation">
                            Intelligent Automation
                          </option>
                          <option value="HR Department">HR Department</option>
                          <option value="Financial Department">Financial Department</option>
                          <option value="Network Department">Network Department</option>
                          <option value="Cyber Security Department">Cyber Security Department</option>
                          <option value="Software Department">Software Department</option>
                          <option value="QA Department">QA Department</option>
                          <option value="SAP Department">SAP Department</option>
                          <option value="Bussiness Intelligent Department">Bussiness Intelligent Department</option>
                          <option value="Bussiness Analyst Department">Bussiness Analyst Department</option>
                        </select>
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          <b>Designation</b>
                        </label>
                        <select
                          name="designation"
                          value={this.state.designation}
                          onChange={this.handleInputChange}
                          defaultValue="Select Type"
                          className="form-control"
                        >
                          <option defaultValue>--Select Designation--</option>
                          <option value="Permenent Employee">Permenent Employee</option>
                          <option value="Contract Employee">Contract-Based Employee</option>
                          <option value="Intern">Intern</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <center>
                    <button
                      className="btn btn-dark"
                      type="submit"
                      style={{ marginTop: "15px" }}
                      onClick={this.onSubmit}
                    >
                      <i className="far far-check-square"></i>
                      &nbsp; Save Changes
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
