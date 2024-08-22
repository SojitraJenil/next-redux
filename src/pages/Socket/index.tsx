import React from "react";
import Navbar from "../../../components/Navbar";
import Socket from "../../../components/socket/Socket";

function index() {
  return (
    <div>
      <Navbar />
      <Socket />
    </div>
  );
}

export default index;
