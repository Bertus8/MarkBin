import React from "react";
import Accounts from "./accounts";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onBinClick = async (event) => {
    event.preventDefault();
    try {
      const binId = await Meteor.callAsync("bins.insertAsync");
      console.log("binId:", binId);
      navigate(`/bins/${binId}`);
    } catch (error) {
      console.error("Error inserting bin:", error);
    }
  };

  return (
    <nav className="nav navbar-default">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">
          Markbin
        </Link>
      </div>
      <ul className="nav navbar-nav">
        <li>
          <a href="#" onClick={onBinClick}>
            Create Bin
          </a>
        </li>
        <li>
          <Accounts />
        </li>
      </ul>
    </nav>
  );
};
export default Header;
