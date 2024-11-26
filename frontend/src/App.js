import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./Home";

//Dashboard

//Employee Management
import CreateEmpData from "./Components/Functions/EmployeeManagement/CreateEmpData";
import EmpData from "./Components/Functions/EmployeeManagement/EmpData";
import EditEmpData from "./Components/Functions/EmployeeManagement/EditEmpData";
import Performance from "./Components/Functions/EmployeeManagement/Performance";
import EmployeeReport from "./Components/Functions/EmployeeManagement/EmployeeReport";

//Project Management
import CreateProjectData from "./Components/Functions/ProjectManagement/CreateProjectData";
import ProjectData from "./Components/Functions/ProjectManagement/ProjectData";
import EditProjectData from "./Components/Functions/ProjectManagement/EditProjectData";
import Progress from "./Components/Functions/ProjectManagement/Progress";
import ProjectReport from "./Components/Functions/ProjectManagement/ProjectReport";

//Department Management
import CreateDeptData from "./Components/Functions/DepartmentManagement/CreateDeptData";
import DeptData from "./Components/Functions/DepartmentManagement/DeptData";
import EditDeptData from "./Components/Functions/DepartmentManagement/EditDeptData";
import DeptReport from "./Components/Functions/DepartmentManagement/DeptReport";
import EmpCount from "./Components/Functions/DepartmentManagement/EmpCount";

//Financial Management
import AddFinancialDetails from "./Components/Functions/FinancialManagement/AddFinancialDetails";
import FinancialDetails from "./Components/Functions/FinancialManagement/FinancialDetails";
import EditFinancialDetails from "./Components/Functions/FinancialManagement/EditFinancialDetails";
import Financial from "./Components/Functions/FinancialManagement/Financial";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />

        <Route path="/CreateEmpData" component={CreateEmpData} />
        <Route path="/EmpData" component={EmpData} />
        <Route path="/EditEmpData/:id" component={EditEmpData} />
        <Route path="/Performance/:id" component={Performance} />
        <Route path="/EmployeeReport" component={EmployeeReport} />

        <Route path="/CreateProjectData" component={CreateProjectData} />
        <Route path="/ProjectData" component={ProjectData} />
        <Route path="/EditProjectData/:id" component={EditProjectData} />
        <Route path="/Progress/:id" component={Progress} />
        <Route path="/ProjectReport" component={ProjectReport} />

        <Route path="/CreateDeptData" component={CreateDeptData} />
        <Route path="/DeptData" component={DeptData} />
        <Route path="/EditDeptData/:id" component={EditDeptData} />
        <Route path="/EmpCount/:id" component={EmpCount} />
        <Route path="/DeptReport" component={DeptReport} />

        <Route path="/AddFinancialDetails" component={AddFinancialDetails} />
        <Route path="/FinancialDetails" component={FinancialDetails} />
        <Route
          path="/EditFinancialDetails/:id"
          component={EditFinancialDetails}
        />
        <Route path="/Financial/:id" component={Financial} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
