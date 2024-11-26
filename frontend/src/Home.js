import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import "./auth/login.css";

const Home = (props) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const res = await axios.get("/api/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUser(res.data);
  };
  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  if (!localStorage.getItem("token")) {
    props.history.push("/");
  }
  return (
    // <div className="m-5">
    //   <div className="jumbotron">
    //     <p className="lead">Welcome {user && user.name}</p>
    //     <button className="btn btn-danger" onClick={logout}>
    //       Logout
    //     </button><br /><br /><br /><br />

    //     <button className="btn btn-success">
    //       EM
    //     </button><br /><br />
    //     <button className="btn btn-success">
    //       PM
    //     </button><br /><br />
    //     <button className="btn btn-success">
    //       FM
    //     </button><br /><br />
    //     <button className="btn btn-success">
    //       DM
    //     </button><br /><br />
    //   </div>
    // </div>
    <div className="homebk">
    <div className="App">
      <header className="App-header">
      <div class="headerx">

        <h1 id="title">White Light </h1>

        <hr></hr>
        </div>

        <div class="area"></div><nav class="main-menu">
            <br></br> <br></br> <br></br> <br></br><ul>
            <li >
                    <a href="/home">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <img src={require('./images/logo.png')} />
                    <span class="nav-text">
                            White Light
                        </span>
                    </a>
                  
                  
                </li>
                <br></br>
                <li>
                    <a href="/home">
                        <i class="fa fa-home fa-2x"></i>
                        <span class="nav-text">
                            Dashboard
                        </span>
                    </a>
                  
                </li>
                <li class="has-subnav">
                    <a href="/EmpData">
                        <i class="fa fa-laptop fa-2x"></i>
                        <span class="nav-text">
                            Employee
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="/DeptData">
                       <i class="fa fa-list fa-2x"></i>
                        <span class="nav-text">
                            Department
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="/ProjectData">
                       <i class="fa fa-folder-open fa-2x"></i>
                        <span class="nav-text">
                            Projects
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a href="/FinancialDetails">
                        <i class="fa fa-bar-chart-o fa-2x"></i>
                        <span class="nav-text">
                            Financial 
                        </span>
                    </a>
                </li>
                <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
                
            </ul>

            <ul class="logout">
                <li>
                   <a onClick={logout}>
                         <i class="fa fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            Logout
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>
       
      </header>

      <body><center>
        
Copyright © White light All rights reserved.
</center></body>


      
    </div>

    <body>

    </body>
    </div>
  );
};

export default Home;
























































































