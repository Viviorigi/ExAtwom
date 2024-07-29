import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import CateForm from "./CateForm";
import { Dialog } from "primereact/dialog";
import { CateSearchParams } from "../../models/CateSearchParams";
import Swal from "sweetalert2";
import ListProbyCategory from "./ListProbyCategory";
import { CateService } from "../../Services/CateService";
import { useAppDispatch } from "../../store/hook";
import { setLoading } from "../../reducers/spinnerSlice";

export default function Category() {
  const [listCate, setListCate] = useState([]);
  const [totalCate, setTotalCate] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openPro, setOpenPro] = useState(false);
  const [cateSearchParams, setCateSearchParams] = useState<CateSearchParams>(
    new CateSearchParams("", 1, 5, new Date().getTime())
  );
  const categoryRef = useRef<any>();
  const dispatch = useAppDispatch();
  const indexOfLastItem = cateSearchParams.page * cateSearchParams.limit;
  const indexOfFirstItem = indexOfLastItem - cateSearchParams.limit;
  const prev = () => {
    if (cateSearchParams.page > 1) {
      setCateSearchParams(() => ({
        ...cateSearchParams,
        page: cateSearchParams.page - 1,
      }));
    }
  };
  const next = () => {
    if (cateSearchParams.page < totalPage) {
      setCateSearchParams(() => ({
        ...cateSearchParams,
        page: cateSearchParams.page + 1,
      }));
    }
  };
  const handleChangeSearch = (event: any) => {
    setCateSearchParams({
      ...cateSearchParams,
      [event.target.name]: event.target.value,
      page:1
    });
  };
  const handleKeyUpSearch = (e: any) => {
    if (e.key === "Enter") {
      setCateSearchParams({
        ...cateSearchParams,
        timer: new Date().getTime(),
      });
    }
  };
  useEffect(() => {
    CateService.getInstance()
      .getLstCate({
        keySearch: cateSearchParams.keySearch,
        limit: cateSearchParams.limit,
        page: cateSearchParams.page,
      })
      .then((resp: any) => {
        dispatch(setLoading(true));
        if (resp.status === 200) {
          dispatch(setLoading(false));
          setListCate(resp.data.categories);
          setTotalCate(resp.data.totalCategories);
          setTotalPage(resp.data.totalPages);
        }
      })
      .catch((err: any) => {
        dispatch(setLoading(false));
      });
  }, [cateSearchParams.timer, cateSearchParams.page]);

  const handleClickClose = () => {
    setOpen(false);
  };
  const handleClickClosePro = () => {
    setOpenPro(false);
  };

  const formatDate = (date: any) => {
    return format(new Date(date), "dd/MM/yyyy hh:mm:ss");
  };

  const addCategory = () => {
    categoryRef.current = null;
    setOpen(true);
  };

  const editCategory = (cate: any) => {
    categoryRef.current = cate;
    setOpen(true);
  };

  const proIdRef = useRef<any>();
  const lstPro = (cateId: any) => {
    proIdRef.current = cateId;
    setOpenPro(true);
  };

  const deleteCategory = (id: any) => {
    console.log(id);

    Swal.fire({
      title: `Xác nhận`,
      text: `Bạn có muốn xóa `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.value) {
        dispatch(setLoading(true));
        CateService.getInstance()
          .deleteCate(id)
          .then((resp: any) => {
            dispatch(setLoading(false));
            setCateSearchParams({
              ...cateSearchParams,
              timer: new Date().getTime(),
            });
            toast.success("Delete successfully");
          })
          .catch((err: any) => {
            dispatch(setLoading(false));
          });
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-10">
          <div className="d-flex justify-content-around">
            <div className="col-4 d-flex">
              <input
                className="form-control"
                type="text"
                placeholder="CateName"
                name="keySearch"
                value={cateSearchParams.keySearch || ""}
                onChange={handleChangeSearch}
                onKeyUp={handleKeyUpSearch}
              />
              <button
                className="btn btn-info"
                onClick={() => {
                  setCateSearchParams({
                    ...cateSearchParams,
                    timer: new Date().getTime(),
                  });
                }}
              >
                Search
              </button>
            </div>
            <div>
              <button className="btn btn-primary" onClick={addCategory}>
                add
              </button>
            </div>
          </div>
          <h3>List Category</h3>
          <h5>TotalCategory:{totalCate}</h5>
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">CateName</th>
                <th scope="col">CreateDate</th>
                <th scope="col">UpdateAt</th>
                <th scope="col">TotalProduct</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {totalCate ===0 && <h3>No data</h3>}
              {listCate.map((c: any, index: number) => (
                <tr key={c.id}>
                  <th scope="row">{indexOfFirstItem+index + 1}</th>
                  <td>{c.name}</td>
                  <td>{formatDate(c.regtDt)}</td>
                  <td>{formatDate(c.updDt)}</td>
                  <td onClick={() => lstPro(c.id)}>{c.products.length} </td>
                  <td>
                    <button
                      className="btn btn-secondary "
                      onClick={() => editCategory(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger "
                      onClick={() => deleteCategory(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex ">
            <button className="btn btn-primary" onClick={prev}>
              prev
            </button>
            <h3 className="m-1">{cateSearchParams.page}</h3>
            <button className="btn btn-success" onClick={next}>
              Next
            </button>
          </div>
          <Dialog
            baseZIndex={1100}
            style={{ width: "800px" }}
            visible={open}
            onHide={() => handleClickClose()}
          >
            <CateForm
              cate={categoryRef.current}
              closeForm={handleClickClose}
              onSave={() => {
                setCateSearchParams((prev) => ({
                  ...prev,
                  timer: new Date().getTime(),
                }));
              }}
            />
          </Dialog>
          <Dialog
            baseZIndex={1100}
            style={{ width: "1000px" }}
            visible={openPro}
            onHide={() => handleClickClosePro()}
          >
            <ListProbyCategory cateId={proIdRef.current} />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
