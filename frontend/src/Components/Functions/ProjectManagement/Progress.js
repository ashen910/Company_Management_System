import React, { Component } from "react";
import axios from "axios";
import { MDBCard } from "mdb-react-ui-kit";

const emailRegex = RegExp(
  /^[a-z0-9.!#$%&â€™+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)$/
);

const phoneRegex = RegExp(/^[0-9]{10,15}$/);

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class Progress extends Component {
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
      t1: "",
      t2: "",
      t3: "",
      t4: "",
      t5: "",
      progress: "",

      formErrors: {
        email: "",
        contactNo: "",
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
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  generateProgress = (e) => {
    e.preventDefault();

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
      t1,
      t2,
      t3,
      tt4,
      t5,
      progress,
    } = this.state;
    this.setState({
      progress:
        ((parseInt(this.state.t1) +
          parseInt(this.state.t2) +
          parseInt(this.state.t3) +
          parseInt(this.state.t4) +
          parseInt(this.state.t5)) *
          100) /
          500 +
        "%",
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
        t1,
        t2,
        t3,
        t4,
        t5,
        progress,
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
        t1: t1,
        t2: t2,
        t3: t3,
        t4: t4,
        t5: t5,
        progress: progress,
      };

      console.log(data);

      axios.put(`/projects/update/${id}`, data).then((res) => {
        let path = "/ProjectData";
        if (res.data.success) {
          alert("Add Project Progress Successfully!");
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
            t1: "",
            t2: "",
            t3: "",
            t4: "",
            t5: "",
            progress: "",
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
          t1: res.data.post.t1,
          t2: res.data.post.t2,
          t3: res.data.post.t3,
          t4: res.data.post.t4,
          t5: res.data.post.t5,
          progress: res.data.post.progress,
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
                Project Progress
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
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Project ID</b>
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
                  <br />

                  <h4>
                    <span class="badge bg-dark text-light opacity-90 fs-1">
                      Progress Calculation
                    </span>
                  </h4>
                  <br />

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Planning</b>
                    </label>
                    <select
                      name="t1"
                      value={this.state.t1}
                      onChange={this.handleInputChange}
                      defaultValue="Select Type"
                      className="form-control"
                    >
                      <option defaultvalue="0%">0%</option>
                      <option value="25%">25%</option>
                      <option value="50%">50%</option>
                      <option value="75%">75%</option>
                      <option value="100%">100%</option>
                    </select>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Design & analysis</b>
                    </label>
                    <select
                      name="t2"
                      value={this.state.t2}
                      onChange={this.handleInputChange}
                      defaultValue="Select Type"
                      className="form-control"
                    >
                     <option defaultvalue="0%">0%</option>
                      <option value="25%">25%</option>
                      <option value="50%">50%</option>
                      <option value="75%">75%</option>
                      <option value="100%">100%</option>
                    </select>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Development</b>
                    </label>
                    <select
                      name="t3"
                      value={this.state.t3}
                      onChange={this.handleInputChange}
                      defaultValue="Select Type"
                      className="form-control"
                    >
                     <option defaultvalue="0%">0%</option>
                      <option value="25%">25%</option>
                      <option value="50%">50%</option>
                      <option value="75%">75%</option>
                      <option value="100%">100%</option>
                    </select>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Testing</b>
                    </label>
                    <select
                      name="t4"
                      value={this.state.t4}
                      onChange={this.handleInputChange}
                      defaultValue="Select Type"
                      className="form-control"
                    >
                      <option defaultvalue="0%">0%</option>
                      <option value="25%">25%</option>
                      <option value="50%">50%</option>
                      <option value="75%">75%</option>
                      <option value="100%">100%</option>
                    </select>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Implementation & Maintenance</b>
                    </label>
                    <select
                      name="t5"
                      value={this.state.t5}
                      onChange={this.handleInputChange}
                      defaultValue="Select Type"
                      className="form-control"
                    >
                      <option defaultvalue="0%">0%</option>
                      <option value="25%">25%</option>
                      <option value="50%">50%</option>
                      <option value="75%">75%</option>
                      <option value="100%">100%</option>
                    </select>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Progress</b>
                    </label>
                    <table>
                      <th>
                        <input
                          readOnly
                          type="text"
                          className="form-control"
                          name="progress"
                          placeholder=""
                          value={this.state.progress}
                          onChange={this.handleInputChange}
                        />
                      </th>
                      <th>
                        <button
                          className="btn btn-info"
                          type="submit"
                          style={{ marginTop: "-5px", marginRight: "30px" }}
                          onClick={this.generateProgress}
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
                      &nbsp; Add Progress
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
