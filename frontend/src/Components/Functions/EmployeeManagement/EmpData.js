import React, { Component } from "react";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";

export default class EmpData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/employee").then((res) => {
      if (res.data.success) {
        this.setState({
          employee: res.data.existingPosts,
        });

        console.log(this.state.employee);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/employee/delete/${id}`).then((res) => {
      alert("Employee Data Deleted Successfully");
      this.retrievePosts();
    });
  };

  filterData(employee, searchKey) {
    const result = employee.filter(
      (post) =>
        post.empId.toLowerCase().includes(searchKey) ||
        post.dept.toLowerCase().includes(searchKey)
    );

    this.setState({ employee: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/employee").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="back fixed" style={{ zIndex: 8 }}>
        <div className="hc">
          <br />
          <a href="/home">
            <i class="fa fa-home fa-10x"></i>
          </a>
          <div id="containerJoin">
            <center>
              <h1 className="gifJoin">All Employees</h1>
            </center>
          </div>
          <div style={{ width: "20%", marginLeft: "70%" }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Employee"
                aria-label="Search"
                onChange={this.handleSearchArea}
              ></input>
            </form>
          </div>

          <div>
            <br />

            <h3>
              <span class="badge bg-dark text-light opacity-90 ">
                Employee Information
              </span>
            </h3>
            <table class="table table-bordered ">
              <thead style={{ background: "#BDBDBD" }}>
                <tr>
                  <th scope="col">EMP ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Personal Information</th>
                  <th scope="col">Employment</th>
                  <th scope="col">Average Performance (out of 10)</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.employee.map((employee, index) => (
                  <tr>
                    <td class="table-light">{employee.empId}</td>
                    <td class="table-light">{employee.name}</td>
                    <td class="table-light">
                      <b>NIC:</b> {employee.nic}
                      <br />
                      <b>Gender:</b> {employee.gender}
                      <br />
                      <b>Contact No:</b> {employee.contactNo}
                      <br />
                      <b>Email:</b> {employee.email}
                      <br />
                    </td>
                    <td class="table-light">
                      <b>Join Date:</b> {employee.joinDate}
                      <br />
                      <b>Due Date:</b> {employee.dueDate}
                      <br />
                      <b>Department:</b> {employee.dept}
                      <br />
                      <b>Position:</b> {employee.designation}
                      <br />
                    </td>

                    <td class="table-light">
                      <b>{employee.performance}</b>
                      <br />
                      <a
                        className="btn btn-dark"
                        href={`/Performance/${employee._id}`}
                      >
                        &nbsp;Add This Month
                      </a>
                    </td>

                    <td class="table-light">
                      <a
                        className="btn btn-dark"
                        href={`/EditEmpData/${employee._id}`}
                      >
                      <i class="fa fa-edit fa-2x"></i>
                      </a>
                      &nbsp;
                      <a
                        className="btn btn-danger"
                        href="#"
                        onClick={() =>
                          window.confirm(
                            "Are You Sure You Want To Delete This Employee ?"
                          ) && this.onDelete(employee._id)
                        }
                      >
                        <i class="fa fa-trash-o fa-2x"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />

            <br />

            <div>
              <center>
                <a className="btn btn-dark  " href="/createEmpData">
                  <b>Add New Employee Information</b>
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a className="btn btn-dark " href="/EmployeeReport">
                  <b>Generate Report</b>
                </a>
              </center>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
