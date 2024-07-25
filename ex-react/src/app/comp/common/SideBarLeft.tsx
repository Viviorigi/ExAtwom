import React from "react";
import { Link } from "react-router-dom";

export default function SideBarLeft() {
  return (
    <div className="col-2">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWI7clES9W75CGV-Bcxj248JnTz50rmHZS0Q&s"
        width="150px"
        height="150px"
        alt=""
      />
      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link className="nav-link" to="/category">
            <h3>Category</h3>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/product">
            <h3>Product</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
}
