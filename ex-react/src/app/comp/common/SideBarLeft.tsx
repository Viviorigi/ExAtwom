import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideBarLeft() {
  const location = useLocation();
  return (
    <div className="col-2">
      <Link className="nav-link" to="/dashboard">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWI7clES9W75CGV-Bcxj248JnTz50rmHZS0Q&s"
          width="150px"
          height="150px"
          alt=""
        />
      </Link>
      <ul className="navbar-nav ">
        <li className="nav-item">
          {location.pathname === "/category" ? (
            <Link
              className="nav-link mt-3"
              style={{ backgroundColor: "aquamarine" }}
              to="/category"
            >
              <h3 className="text-danger" style={{paddingLeft:"20px"}}>Category</h3>
            </Link>
          ) : (
            <Link className="nav-link" to="/category">
              <h3 style={{paddingLeft:"20px"}}>Category</h3>
            </Link>
          )}
        </li>
        <li className="nav-item">
          {location.pathname === "/product" ? (
            <Link
              className="nav-link mt-3"
              style={{ backgroundColor: "aquamarine" }}
              to="/product"
            >
              <h3 className=" text-danger" style={{paddingLeft:"20px"}}>Product</h3>
            </Link>
          ) : (
            <Link className="nav-link" to="/product">
              <h3 style={{paddingLeft:"20px"}}>Product</h3>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
