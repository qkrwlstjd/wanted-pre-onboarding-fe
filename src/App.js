import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./Signin";
import Todo from "./Todo";

function App() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Signin />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/wanted-pre-onboarding-fe/todo" element={<Todo />} />
          <Route path="/wanted-pre-onboarding-fe" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
