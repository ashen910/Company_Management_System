import axios from "axios";
import React, { useState } from "react";
import "./login.css";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
  });


  const { email, password, error } = data;


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({ ...data, error: null });
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      props.history.push("/home");
    } catch (err) {
      setData({ ...data, error: err.response.data.error });
    }
  };


  return (
    <div className="bdy">
      <div className="row">
        <div className="col-sm-1" />
        <div className="col-sm-4">
          <br></br>   <br></br>
          <h3 className="text-muted text-center mb-5">LOG INTO YOUR ACCOUNT</h3>
          <div className="card p-5 shadow">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {error ? <p className="text-danger">{error}</p> : null}
              <div className="text-center">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Login
                </button>
              </div><br />
              <center>
                <a className="btn btn-text-primary " href="/register">
                  Don't Have an Account? <b>Register</b>
                </a>
              </center>
            </form>
          </div>
        </div>
        <div className="col-sm-2" />
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
};



export default Login;
