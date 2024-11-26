import React, { Component } from "react";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default class DeptReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
    };
  }

  createPdf = (pdfBody) => {
    var doc = new jsPDF();
    var totalPagesExp = "{total_pages_count_string}"; //placeholder for total number of pages
    doc.autoTable({
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(18);
        var fileTitle1 = "White Light pvt.ltd ";
        doc.text(fileTitle1, 15, 20);

        doc.setFontSize(12);
        var fileTitle2 = "Department Details Report 2022";
        var img = "https://i.ibb.co/syhgL0G/Microsoft-Teams-image-1.png";
        doc.text(fileTitle2, 15, 40);
        doc.addImage(img, "JPEG", 0, 0, 210, 30);

        doc.setFontSize(9);
        var today = new Date();
        var newdat = "Date Printed : " + today;
        doc.text(100, 40, newdat);

        // Footer
        var pageSize = doc.internal.pageSize;
        //jsPDF 1.4+ uses getHeight, <1.4 uses .height
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

        doc.autoTable({ html: "#my-table", startY: pageHeight - 250 });

        var str = "Page " + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      margin: {
        bottom: 60, //this decides how big your footer area will be
        top: 40, //this decides how big your header area will be.
      },
    });
    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save("Department_Report.pdf"); //this downloads a copy of the pdf in your local instance.
  };

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/departments").then((res) => {
      if (res.data.success) {
        this.setState({
          departments: res.data.existingPosts,
        });

        console.log(this.state.departments);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/departments/delete/${id}`).then((res) => {
      alert("Department Data Deleted Successfully");
      this.retrievePosts();
    });
  };

  filterData(departments, searchKey) {
    const result = departments.filter((post) =>
      post.dCategory.toLowerCase().includes(searchKey)||
      post.dName.toLowerCase().includes(searchKey)
    );

    this.setState({ departments: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/departments").then((res) => {
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
              <h1 className="gifJoin">All Department Details Report</h1>
            </center>
          </div>

          <div style={{ width: "20%", marginLeft: "70%" }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Department"
                aria-label="Search"
                onChange={this.handleSearchArea}
              ></input>
            </form>
          </div>

          <div>
            <br />

            <h3>
              <span class="badge bg-dark text-light opacity-90 ">
                Departments Information
              </span>
            </h3>
            <table class="table table-bordered " id="my-table">
              <thead style={{ background: "#BDBDBD" }}>
                <tr>
                  <th scope="col">Department Name</th>
                  <th scope="col">Department Information</th>
                  <th scope="col">Department Head Information</th>
                  <th scope="col">Total Count</th>
                </tr>
              </thead>
              <tbody>
                {this.state.departments.map((departments, index) => (
                  <tr>
                    <td class="table-light">{departments.dName}</td>
                    <td class="table-light">
                      <b>Category:</b> {departments.dCategory}
                      <br />
                      <b>Dept Email:</b> {departments.dEmail}
                      <br />
                      <b>Reporting Teams:</b> {departments.dTeams}
                      <br />
                    </td>
                    <td class="table-light">
                      <b>Director's Name:</b> {departments.hName}
                      <br />
                      <b>Director's Email:</b> {departments.hEmail}
                      <br />
                      <b>Contact No:</b> {departments.hNo}
                      <br />
                    </td>

                    <td class="table-light">{departments.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <div>
              <center>
                <a
                  className="btn btn-dark text-light "
                  onClick={this.createPdf}
                >
                  <b>Download PDF</b> &nbsp;
                </a>
              </center>
            </div>
            <br />
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
