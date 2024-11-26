/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

export default class FinancialDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      financial: [],
    };
  }

  componentDidMount() {
    this.retrieveFinancial();
  }

  retrieveFinancial() {
    axios.get("/financial").then((res) => {
      if (res.data.success) {
        this.setState({
          financial: res.data.existingFinancial,
        });

        console.log(this.state.financial);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/financial/delete/${id}`).then((res) => {
      alert("Delete Successfully");
      this.retrieveFinancial();
    });
  };

  filterData(financial, searchKey) {
    const result = financial.filter(
      (financial) =>
        financial.status.toLowerCase().includes(searchKey) ||
        financial.fId.toLowerCase().includes(searchKey)
    );

    this.setState({ financial: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/financial").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingFinancial, searchKey);
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
              <h1 className="gifJoin">Financial Details</h1>
            </center>
          </div>
          <br />
          <div style={{ width: "20%", marginLeft: "70%" }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by Month"
                aria-label="Search"
                onChange={this.handleSearchArea}
              ></input>
            </form>
          </div>
          <h3>
            <span class="badge bg-dark text-light opacity-90 ">
              Financial Information
            </span>
          </h3>
          <table class="table table-bordered ">
            <thead style={{ background: "#BDBDBD" }}>
              <tr>
                <th scope="col">FID</th>
                <th scope="col">Month</th>
                <th scope="col">Total Income(Rs.)</th>
                <th scope="col">Total Outcome(Rs.)</th>
                <th scope="col">Profit or Loss(Rs.)</th>
                <th scope="col">Status</th>
                <th scope="col">Review</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.financial.map((financial, index) => (
                <tr key={index}>
                  <td class="table-light">{financial.fId}</td>

                  <td class="table-light">{financial.date}</td>
                  <td class="table-light">{financial.totalIncome}</td>
                  <td class="table-light">{financial.totalOutcome}</td>
                  <td class="table-light">{financial.money}</td>

                  <td class="table-light">{financial.status}</td>
                  <td class="table-light">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <a
                      className="btn btn-dark"
                      href={`/financial/${financial._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <i class="fa fa-eye fa-2x"></i>
                    </a>
                  </td>
                  <td class="table-light">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <a
                      className="btn btn-dark"
                      href={`/EditFinancialDetails/${financial._id}`}
                    >
                      <i class="fa fa-edit fa-2x"></i>
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() =>
                        window.confirm(
                          "Are You Sure You Want To Delete This financial statement ?"
                        ) && this.onDelete(financial._id)
                      }
                    >
                      <i class="fa fa-trash-o fa-2x"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <div>
            <center>
              <a
                className="btn btn-dark text-light "
                href="/AddFinancialDetails"
              >
                <MDBIcon fas icon="user-plus" />
                &nbsp;<b>Create This Month Financial Statement</b>
              </a>
            </center>
          </div>

          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}
