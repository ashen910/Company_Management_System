import React, { Component } from "react";
import axios from "axios";
import { MDBCard } from "mdb-react-ui-kit";

const priceRegex = RegExp(/^\d*\.?\d*$/);

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class EditFinancialDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fId: "",
      totalIncome: "",
      totalOutcome: "",
      money: "",
      date: "",
      status: "",
      ifweek: "",
      isweek: "",
      itweek: "",
      ifoweek: "",
      ifiweek: "",
      ofweek: "",
      osweek: "",
      otweek: "",
      ofoweek: "",
      ofiweek: "",

      formErrors: {
        ifweek: "",
        isweek: "",
        itweek: "",
        ifoweek: "",
        ifiweek: "",
        ofweek: "",
        osweek: "",
        otweek: "",
        ofoweek: "",
        ofiweek: "",
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "ifweek":
        formErrors.ifweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
        break;
      case "isweek":
        formErrors.isweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
        break;
      case "itweek":
        formErrors.itweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
        break;
      case "ifoweek":
        formErrors.ifoweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
        break;
      case "ifiweek":
        formErrors.ifiweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
        break;
      case "ofweek":
        formErrors.ofweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
        break;
      case "osweek":
        formErrors.osweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
        break;
      case "otweek":
        formErrors.otweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
        break;
      case "ofoweek":
        formErrors.ofoweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
        break;
      case "ofiweek":
        formErrors.ofiweek = priceRegex.test(value)
          ? ""
          : "Must be a decimal value!";
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

  totPayble = (e) => {
    e.preventDefault();

    const {
      fId,
      totalIncome,
      totalOutcome,
      money,
      date,
      status,
      ifweek,
      isweek,
      itweek,
      ifoweek,
      ifiweek,
      ofweek,
      osweek,
      otweek,
      ofoweek,
      ofiweek,
      ifweekd,
      isweekd,
      itweekd,
      ifoweekd,
      ifiweekd,
      ofweekd,
      osweekd,
      otweekd,
      ofoweekd,
      ofiweekd,
    } = this.state;
    this.setState({
      money:
        parseInt(this.state.totalIncome) -
        parseInt(this.state.totalOutcome) +
        ".00",
    });
  };

  theTotalIncome = (e) => {
    e.preventDefault();

    const {
      fId,
      totalIncome,
      totalOutcome,
      money,
      date,
      status,
      ifweek,
      isweek,
      itweek,
      ifoweek,
      ifiweek,
      ofweek,
      osweek,
      otweek,
      ofoweek,
      ofiweek,
      ifweekd,
      isweekd,
      itweekd,
      ifoweekd,
      ifiweekd,
      ofweekd,
      osweekd,
      otweekd,
      ofoweekd,
      ofiweekd,
    } = this.state;
    this.setState({
      totalIncome:
        parseInt(this.state.ifweek) +
        parseInt(this.state.isweek) +
        parseInt(this.state.itweek) +
        parseInt(this.state.ifoweek) +
        parseInt(this.state.ifiweek) +
        ".00",
    });
  };

  theTotalOutcome = (e) => {
    e.preventDefault();

    const {
      fId,
      totalIncome,
      totalOutcome,
      money,
      date,
      status,
      ifweek,
      isweek,
      itweek,
      ifoweek,
      ifiweek,
      ofweek,
      osweek,
      otweek,
      ofoweek,
      ofiweek,
      ifweekd,
      isweekd,
      itweekd,
      ifoweekd,
      ifiweekd,
      ofweekd,
      osweekd,
      otweekd,
      ofoweekd,
      ofiweekd,
    } = this.state;
    this.setState({
      totalOutcome:
        parseInt(this.state.ofweek) +
        parseInt(this.state.osweek) +
        parseInt(this.state.otweek) +
        parseInt(this.state.otweek) +
        parseInt(this.state.ofiweek) +
        ".00",
    });
  };

  theStatus = (e) => {
    e.preventDefault();
    const {
      fId,
      totalIncome,
      totalOutcome,
      money,
      date,
      status,
      ifweek,
      isweek,
      itweek,
      ifoweek,
      ifiweek,
      ofweek,
      osweek,
      otweek,
      ofoweek,
      ofiweek,
      ifweekd,
      isweekd,
      itweekd,
      ifoweekd,
      ifiweekd,
      ofweekd,
      osweekd,
      otweekd,
      ofoweekd,
      ofiweekd,
    } = this.state;
    this.setState({
      status:
        parseInt(this.state.totalIncome) > parseInt(this.state.totalOutcome)
          ? "Profit"
          : "Loss",
    });
  };

  generateKey = (e) => {
    e.preventDefault();

    const {
      fId,
      totalIncome,
      totalOutcome,
      money,
      date,
      status,
      ifweek,
      isweek,
      itweek,
      ifoweek,
      ifiweek,
      ofweek,
      osweek,
      otweek,
      ofoweek,
      ofiweek,
      ifweekd,
      isweekd,
      itweekd,
      ifoweekd,
      ifiweekd,
      ofweekd,
      osweekd,
      otweekd,
      ofoweekd,
      ofiweekd,
    } = this.state;
    this.setState({ fId: "F" + this.state.date });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      const id = this.props.match.params.id;

      const {
        fId,
        totalIncome,
        totalOutcome,
        money,
        date,
        status,
        ifweek,
        isweek,
        itweek,
        ifoweek,
        ifiweek,
        ofweek,
        osweek,
        otweek,
        ofoweek,
        ofiweek,
      } = this.state;

      const data = {
        fId: fId,
        totalIncome: totalIncome,
        totalOutcome: totalOutcome,
        money: money,
        date: date,
        status: status,
        ifweek: ifweek,
        isweek: isweek,
        itweek: itweek,
        ifoweek: ifoweek,
        ifiweek: ifiweek,
        ofweek: ofweek,
        osweek: osweek,
        otweek: otweek,
        ofoweek: ofoweek,
        ofiweek: ofiweek,
      };
      console.log(data);

      axios.put(`/financial/update/${id}`, data).then((res) => {
        let path = "/FinancialDetails";
        if (res.data.success) {
          alert("financial details Updated Successfully");
          this.props.history.push(path);
          this.setState({
            fId: "",
            totalIncome: "",
            totalOutcome: "",
            money: "",
            date: "",
            status: "",
            ifweek: "",
            isweek: "",
            itweek: "",
            ifoweek: "",
            ifiweek: "",
            ofweek: "",
            osweek: "",
            otweek: "",
            ofoweek: "",
            ofiweek: "",
          });
        }
      });
    } else {
      console.error("Form Invalid");
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/financial/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          fId: res.data.financial.fId,
          totalIncome: res.data.financial.totalIncome,
          totalOutcome: res.data.financial.totalOutcome,
          money: res.data.financial.money,
          date: res.data.financial.date,
          status: res.data.financial.status,
          ifweek: res.data.financial.ifweek,
          isweek: res.data.financial.isweek,
          itweek: res.data.financial.itweek,
          ifoweek: res.data.financial.ifoweek,
          ifiweek: res.data.financial.ifiweek,
          ofweek: res.data.financial.ofweek,
          osweek: res.data.financial.osweek,
          otweek: res.data.financial.otweek,
          ofoweek: res.data.financial.ofoweek,
          ofiweek: res.data.financial.ofiweek,
          ifweekd: res.data.financial.ifweekd,
          isweekd: res.data.financial.isweekd,
          itweekd: res.data.financial.itweekd,
          ifoweekd: res.data.financial.ifoweekd,
          ifiweekd: res.data.financial.ifiweekd,
          ofweekd: res.data.financial.ofweekd,
          osweekd: res.data.financial.osweekd,
          otweekd: res.data.financial.otweekd,
          ofoweekd: res.data.financial.ofoweekd,
          ofiweekd: res.data.financial.ofiweekd,
        });

        console.log(this.state.financial);
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
                Edit Financial Details
              </span>
            </h1>
          </center>
          <center>
            <br />
            <MDBCard
              className="text-black mb-3"
              style={{
                maxWidth: "50rem",
                backgroundColor: "rgba(52, 52, 52, 0.4)",
              }}
            >
              <div className="col-md-9 mt-4 mx-auto">
                <br />
                <form>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px", color: "black" }}>
                      <b> Month</b>
                    </label>
                    <input
                      type="month"
                      className="form-control"
                      name="date"
                      placeholder=""
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px", color: "black" }}>
                      <b> ID</b>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="fId"
                      placeholder="EX:Fxxxxxxx"
                      value={this.state.fId}
                      onChange={this.handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px", color: "black" }}>
                      <h4>
                        <span class="badge bg-dark text-light opacity-90 fs-1">
                          Income List
                        </span>
                      </h4>
                    </label>
                    <br />

                    <div style={{ display: "flex" }}>
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 01
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ifweekd"
                          placeholder="Description"
                          value={this.state.ifweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ifweek"
                          placeholder="Amount"
                          value={this.state.ifweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.ifweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.ifweek}
                          </span>
                        )}
                      </div>
                      &nbsp;&nbsp;
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 02
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="isweekd"
                          placeholder="Description"
                          value={this.state.isweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="isweek"
                          placeholder="Amount"
                          value={this.state.isweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.isweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.isweek}
                          </span>
                        )}
                      </div>
                      &nbsp;&nbsp;
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 03
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="itweekd"
                          placeholder="Description"
                          value={this.state.itweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="itweek"
                          placeholder="Amount"
                          value={this.state.itweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.itweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.itweek}
                          </span>
                        )}
                      </div>
                      &nbsp;&nbsp;
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 04
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ifoweekd"
                          placeholder="Description"
                          value={this.state.ifoweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ifoweek"
                          placeholder="Amount"
                          value={this.state.ifoweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.ifoweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.ifoweek}
                          </span>
                        )}
                      </div>
                      &nbsp;&nbsp;
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 05
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ifiweekd"
                          placeholder="Description"
                          value={this.state.ifiweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ifiweek"
                          placeholder="Amount"
                          value={this.state.ifiweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.ifiweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.ifiweek}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px", color: "black" }}>
                      <h4>
                        <span class="badge bg-dark text-light opacity-90 fs-1">
                          Outcome List
                        </span>
                      </h4>
                    </label>
                    <br />

                    <div style={{ display: "flex" }}>
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 01
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ofweekd"
                          placeholder="Description"
                          value={this.state.ofweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ofweek"
                          placeholder="Amount"
                          value={this.state.ofweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.ofweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.ofweek}
                          </span>
                        )}
                      </div>
                      &nbsp;&nbsp;
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 02
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="osweekd"
                          placeholder="Description"
                          value={this.state.osweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="osweek"
                          placeholder="Amount"
                          value={this.state.osweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.osweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.osweek}
                          </span>
                        )}
                      </div>
                      &nbsp;&nbsp;
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 03
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="otweekd"
                          placeholder="Description"
                          value={this.state.otweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="otweek"
                          placeholder="Amount"
                          value={this.state.otweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.otweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.otweek}
                          </span>
                        )}
                      </div>
                      &nbsp;&nbsp;
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 04
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ofoweekd"
                          placeholder="Description"
                          value={this.state.ofoweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ofoweek"
                          placeholder="Amount"
                          value={this.state.ofoweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.ofoweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.ofoweek}
                          </span>
                        )}
                      </div>
                      &nbsp;&nbsp;
                      <div style={{ display: "table-column" }}>
                        <label style={{ marginBottom: "5px", color: "black" }}>
                          Week 05
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ofiweekd"
                          placeholder="Description"
                          value={this.state.ofiweekd}
                          onChange={this.handleInputChange}
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          name="ofiweek"
                          placeholder="Amount"
                          value={this.state.ofiweek}
                          onChange={this.handleInputChange}
                        />
                        {formErrors.ofiweek.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.ofiweek}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{ display: "table-column", marginRight: "45px" }}
                    >
                      <button
                        className="btn btn-info"
                        type="submit"
                        style={{ marginTop: "15px", marginBottom: "15px" }}
                        onClick={this.theTotalIncome}
                      >
                        <i className="far far-check-square"></i>
                        &nbsp; Calculate Total Income
                      </button>
                      <br />
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          name="totalIncome"
                          placeholder=""
                          value={this.state.totalIncome}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{ display: "table-column", marginLeft: "115px" }}
                      >
                        <button
                          className="btn btn-info"
                          type="submit"
                          style={{ marginTop: "15px", marginBottom: "15px" }}
                          onClick={this.theTotalOutcome}
                        >
                          <i className="far far-check-square"></i>
                          &nbsp; Calculate Total Outcome
                        </button>
                        <br />
                        <div
                          className="form-group"
                          style={{ marginBottom: "15px" }}
                        >
                          <input
                            type="text"
                            className="form-control"
                            name="totalOutcome"
                            placeholder=""
                            value={this.state.totalOutcome}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px", color: "black" }}>
                      <h4>
                        <span class="badge bg-dark text-light opacity-90 fs-1">
                          Total Profit or Loss Amount (LKR)
                        </span>
                      </h4>
                    </label>
                    <br />
                    <div style={{ display: "flex" }}>
                      <button
                        className="btn btn-info"
                        type="submit"
                        style={{ marginTop: "15px" }}
                        onClick={this.totPayble}
                      >
                        <i className="far far-check-square"></i>
                        &nbsp; Calculate Total Amount
                      </button>

                      <br />
                      <div
                        className="form-group"
                        style={{ marginTop: "15px", marginLeft: "155px" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          name="money"
                          placeholder="RS XXXX.XX"
                          value={this.state.money}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <button
                      className="btn btn-info"
                      type="submit"
                      style={{
                        marginTop: "15px",
                        marginRight: "25px",
                      }}
                      onClick={this.theStatus}
                    >
                      <i className="far far-check-square"></i>
                      View Status
                    </button>

                    <div
                      className="form-group"
                      style={{ marginTop: "15px", marginLeft: "225px" }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="status"
                        placeholder=""
                        value={this.state.status}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-dark"
                    type="submit"
                    style={{ marginTop: "15px" }}
                    onClick={this.onSubmit}
                  >
                    <i className="far far-check-square"></i>
                    &nbsp; Save Changes
                  </button>
                  <br /> <br />
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
