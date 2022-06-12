import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="notFound">
      <h1>404 Page not found</h1>
    <Button className="button">  <Link className="home" to='/'>Home</Link></Button>
    </div>
  );
};

export default NotFound;
