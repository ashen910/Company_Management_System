import React, { Component } from "react";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";

export default class ProjectData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/projects").then((res) => {
      if (res.data.success) {
        this.setState({
          projects: res.data.existingPosts,
        });

        console.log(this.state.projects);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/projects/delete/${id}`).then((res) => {
      alert("Projects Data Deleted Successfully");
      this.retrievePosts();
    });
  };

  filterData(projects, searchKey) {
    const result = projects.filter(
      (post) =>
        post.pLevel.toLowerCase().includes(searchKey) ||
        post.cName.toLowerCase().includes(searchKey)

    );

    this.setState({ projects: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/projects").then((res) => {
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
              <h1 className="gifJoin">Projects Details</h1>
            </center>
          </div>

          <div style={{ width: "20%", marginLeft: "70%" }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Project"
                aria-label="Search"
                onChange={this.handleSearchArea}
              ></input>
            </form>
          </div>

          <div>
            <br />

            <h3>
              <span class="badge bg-dark text-light opacity-90 ">
                Projects Information
              </span>
            </h3>
            <table class="table table-bordered ">
              <thead style={{ background: "#BDBDBD" }}>
                <tr>
                  <th scope="col">Project ID</th>
                  <th scope="col">Client Information</th>
                  <th scope="col">Project Information</th>
                  <th scope="col">Progress</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.projects.map((projects, index) => (
                  <tr>
                    <td class="table-light">{projects.projectId}</td>
                    <td class="table-light">
                      <b>Name:</b> {projects.cName}
                      <br />
                      <b>Client Email:</b> {projects.email}
                      <br />
                      <b>Contact No:</b> {projects.contactNo}
                      <br />
                    </td>
                    <td class="table-light">
                      <b>Description:</b> {projects.description}
                      <br />
                      <b>Assign to:</b> {projects.dept}
                      <br />
                      <b>Priority Level:</b> {projects.pLevel}
                      <br />
                      <b>Start Date:</b> {projects.sDate}
                      <br />
                      <b>End Date:</b> {projects.eDate}
                      <br />
                      <b>Remarks:</b> {projects.remarks}
                      <br />
                    </td>

                    <td class="table-light">
                      {projects.progress}
                      <br />
                      <a
                        className="btn btn-dark"
                        href={`Progress/${projects._id}`}
                      >
                        &nbsp;Add Progress
                      </a>
                    </td>

                    <td class="table-light">
                      <a
                        className="btn btn-dark"
                        href={`EditProjectData/${projects._id}`}
                      >
                       <i class="fa fa-edit fa-2x"></i>
                      </a>
                      &nbsp;
                      <a
                        className="btn btn-danger"
                        href="#"
                        onClick={() =>
                          window.confirm(
                            "Are You Sure You Want To Delete This Project Data?"
                          ) && this.onDelete(projects._id)
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
                <a
                  className="btn btn-dark text-light "
                  href="/CreateProjectData"
                >
                  <b>Add New Project Data</b>
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a className="btn btn-dark text-light " href="/ProjectReport">
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
