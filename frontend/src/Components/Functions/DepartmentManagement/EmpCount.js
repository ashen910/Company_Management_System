import React, { Component } from "react";
import axios from "axios";
import { MDBCard } from "mdb-react-ui-kit";

const emailRegex = RegExp(
  /^[a-z0-9.!#$%&â€™+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)$/
);

const phoneRegex = RegExp(/^[0-9]{10,15}$/);

const charRegex = RegExp(/^[a-zA-Z]{1,50}$/);

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class EmpCount extends Component {
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
      permanent: "",
      contract: "",
      interns: "",
      total: "",

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

  generateTotal = (e) => {
    e.preventDefault();

    const {
      dCategory,
      dName,
      dEmail,
      dTeams,
      hName,
      hEmail,
      hNo,
      uDate,
      permanent,
      contract,
      interns,
      total,
    } = this.state;
    this.setState({
      total:
        parseInt(this.state.permanent) +
        parseInt(this.state.contract) +
        parseInt(this.state.interns),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      const id = this.props.match.params.id;
      const {
        dCategory,
        dName,
        dEmail,
        dTeams,
        hName,
        hEmail,
        hNo,
        uDate,
        permanent,
        contract,
        interns,
        total,
      } = this.state;

      const data = {
        dCategory: dCategory,
        dName: dName,
        dEmail: dEmail,
        dTeams: dTeams,
        hName: hName,
        hEmail: hEmail,
        hNo: hNo,
        uDate: uDate,
        permanent: permanent,
        contract: contract,
        interns: interns,
        total: total,
      };

      console.log(data);

      axios.put(`/departments/update/${id}`, data).then((res) => {
        let path = "/DeptData";
        if (res.data.success) {
          alert("Add Employee Count Successfully!");
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
            permanent: "",
            contract: "",
            interns: "",
            total: "",
          });
        }
      });
    } else {
      console.error("Form Invalid");
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/departments/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          dCategory: res.data.post.dCategory,
          dName: res.data.post.dName,
          dEmail: res.data.post.dEmail,
          dTeams: res.data.post.dTeams,
          hName: res.data.post.hName,
          hEmail: res.data.post.hEmail,
          hNo: res.data.post.hNo,
          uDate: res.data.post.uDate,
          permanent: res.data.post.permanent,
          contract: res.data.post.contract,
          interns: res.data.post.interns,
          total: res.data.post.total,
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
                Department Employee Count
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
              <div className="col-md-8 mt-4 mx-auto">
                <br />
                <form>
                  <h4>
                    <span class="badge bg-dark text-light opacity-90 fs-1">
                      Department Employee Count
                    </span>
                  </h4>
                  <br />

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Department Name</b>
                    </label>
                    <input
                      readOnly
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
                      <b>No OF Teams</b>
                    </label>
                    <input
                      readOnly
                      type="number"
                      className="form-control"
                      name="dTeams"
                      placeholder="(1-10)"
                      value={this.state.dTeams}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <br />
                  <h4>
                    <span class="badge bg-dark text-light opacity-90 fs-1">
                      Employee Calculation
                    </span>
                  </h4>
                  <br />
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Permenent Emplyees </b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="permanent"
                      placeholder=""
                      value={this.state.permanent}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Contract Emplyees </b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="contract"
                      placeholder=""
                      value={this.state.contract}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">
                      <b>Interns </b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="interns"
                      placeholder=""
                      value={this.state.interns}
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
                          name="total"
                          placeholder=""
                          value={this.state.total}
                          onChange={this.handleInputChange}
                        />
                      </th>
                      <th>
                        <button
                          className="btn btn-info"
                          type="submit"
                          style={{ marginTop: "-5px", marginRight: "30px" }}
                          onClick={this.generateTotal}
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
                      &nbsp; Add Employee Count
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
