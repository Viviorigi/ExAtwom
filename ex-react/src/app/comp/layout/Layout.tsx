import React from "react";
import { Link, Outlet } from "react-router-dom";
import SideBarLeft from "../common/SideBarLeft";
import Header from "../common/Header";
import { useAppSelector } from "../../store/hook";
import { spinner } from "../../../App";

export default function Layout() {
  const loading = useAppSelector((state) => state.spinner.loading);
  return (
    <>
      {loading ? (
        <div className="progress-spinner text-center">
          <div className="swm-loader"></div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <SideBarLeft />
            <div className="col-10">
              <div className="mb-3">
                <Header />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
