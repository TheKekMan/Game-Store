import React from "react";
import { Link } from "react-router-dom";

const DevItem = ({ dev }: { dev: any }) => {
  return (
    <div className="dev-item">
      <Link to={`/devs/${dev._id}`}>
        <img src={dev.logo} alt="" />
        <h3>{dev.name}</h3>
      </Link>
    </div>
  );
};

export default DevItem;
