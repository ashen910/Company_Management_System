import React, { Component } from "react";
import axios from "axios";
import { MDBCard } from "mdb-react-ui-kit";

const emailRegex = RegExp(
  /^[a-z0-9.!#$%&â€™+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)$/
);

const phoneRegex = RegExp(/^[0-9]{10,15}$/);
const noRegex = RegExp(/^[1-5]{1}$/);

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class EditProjectData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cName: "",
      email: "",
      contactNo: "",
      description: "",
      projectId: "",
      dept: "",
      pLevel: "",
      sDate: "",
      eDate: "",
      remarks: "",

      formErrors: {
        email: "",
        contactNo: "",
        pLevel: ""
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
      case "pLevel":
          formErrors.pLevel = noRegex.test(value)
            ? ""
            : "invalid priority level";
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
        cName,
        email,
        contactNo,
        pLevel,
        projectId,
        sDate,
        eDate,
        dept,
        description,
        remarks,
      } = this.state;

      const data = {
        cName: cName,
        contactNo: contactNo,
        email: email,
        projectId: projectId,
        sDate: sDate,
        eDate: eDate,
        dept: dept,
        description: description,
        pLevel: pLevel,
        remarks: remarks,
      };

      console.log(data);

      axios.put(`/projects/update/${id}`, data).then((res) => {
        let path = "/ProjectData";
        if (res.data.success) {
          alert("Update Project Data Successfully!");
          this.props.history.push(path);
          this.setState({
            cName: "",
            email: "",
            contactNo: "",
            description: "",
            projectId: "",
            dept: "",
            pLevel: "",
            sDate: "",
            eDate: "",
            remarks: "",
          });
        }
      });
    } else {
      console.error("Form Invalid");
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/projects/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          cName: res.data.post.cName,
          contactNo: res.data.post.contactNo,
          email: res.data.post.email,
          projectId: res.data.post.projectId,
          sDate: res.data.post.sDate,
          eDate: res.data.post.eDate,
          dept: res.data.post.dept,
          description: res.data.post.description,
          pLevel: res.data.post.pLevel,
          remarks: res.data.post.remarks,
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
                Edit Project Information
              </span>
            </h1>
          </center>
          <center>
            <br />
            <MDBCard
              className="text-black mb-3"
              style={{
                maxWidth: "45rem",
                backgroundColor: "rgba(52, 52, 52, 0.4)",
              }}
            >
              <div className="col-md-8 mt-4 mx-auto">
                <br />
                <form>
                  <h4>
                    <span class="badge bg-dark text-light opacity-90 fs-1">
                      Client Information
                    </span>
                  </h4>
                  <br />
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Client Name</b>
                    </label>
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      name="cName"
                      placeholder="Client/Company Name"
                      value={this.state.cName}
                      onChange={this.handleInputChange}
                    />
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
                      <span style={{ color: "red" }}>{formErrors.email}</span>
                    )}
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
                  <br />

                  <h4>
                    <span class="badge bg-dark text-light opacity-90 fs-1">
                      Project Infomation
                    </span>
                  </h4>
                  <br />

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>projectId</b>
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      name="projectId"
                      placeholder="EX:WL_xxxxxxxxx"
                      value={this.state.projectId}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Project Description</b>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder=""
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Assign To</b>
                    </label>
                    <select
                      disabled
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
                      <option value="Network Department">Network Department</option>
                      <option value="Cyber Security Department">Cyber Security Department</option>
                      <option value="Software Department">Software Department</option>
                      <option value="SAP Department">SAP Department</option>
                      <option value="Bussiness Intelligent Department">Bussiness Intelligent Department</option>
                      <option value="Bussiness Analyst Department">Bussiness Analyst Department</option>
                    </select>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Priority Level</b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="pLevel"
                      placeholder="(1-5)"
                      value={this.state.pLevel}
                      onChange={this.handleInputChange}
                    />
                     {formErrors.pLevel.length > 0 && (
                      <span style={{ color: "red" }}>{formErrors.pLevel}</span>
                    )}
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Start Date</b>
                    </label>
                    <input
                      type="date"
                      readOnly
                      className="form-control"
                      name="sDate"
                      placeholder=""
                      value={this.state.sDate}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>End Date</b>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="eDate"
                      placeholder=""
                      value={this.state.eDate}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Remarks</b>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="remarks"
                      placeholder="(Optional)"
                      value={this.state.remarks}
                      onChange={this.handleInputChange}
                    />
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
