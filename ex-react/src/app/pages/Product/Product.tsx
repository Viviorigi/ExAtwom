import React, { useEffect, useRef, useState } from "react";
import { ProductSearchParams } from "../../models/ProductSearchParams";
import { format } from "date-fns";
import { Dialog } from "primereact/dialog";
import { ProductService } from "../../Services/ProductService";
import { useAppDispatch } from "../../store/hook";
import { setLoading } from "../../reducers/spinnerSlice";
import { CateService } from "../../Services/CateService";
import ProductForm from "./ProductForm";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Product() {
  //total set lai, phan trang theo dung total, selected edit , so index trang 2 tang tiep
  const [listPro, setListPro] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [listCate, setListCate] = useState([]);
  const [open, setOpen] = useState(false);
  const [productSearchParams, setProductSearchParams] =
    useState<ProductSearchParams>(
      new ProductSearchParams("", "", 1, 5, new Date().getTime())
    );
  const productRef = useRef<any>();
  const dispatch = useAppDispatch();
  //xu ly trang tiep theo index tang
  const indexOfLastItem = productSearchParams.page * productSearchParams.limit;
  const indexOfFirstItem = indexOfLastItem - productSearchParams.limit;
  const prev = () => {
    if (productSearchParams.page > 1) {
      setProductSearchParams(() => ({
        ...productSearchParams,
        page: productSearchParams.page - 1,
      }));
    }
  };
  const next = () => {
    if(productSearchParams.page < totalPage){
      setProductSearchParams(() => ({
        ...productSearchParams,
        page: productSearchParams.page + 1,
      }));
    } 
  };
  const handleChangeSearch = (event: any) => {
    setProductSearchParams({
      ...productSearchParams,
      [event.target.name]: event.target.value,
      page:1
    });
  };
  const handleKeyUpSearch = (e: any) => {
    if (e.key === "Enter") {
      setProductSearchParams({
        ...productSearchParams,
        timer: new Date().getTime(),
      });
    }
  };
  useEffect(() => {
    ProductService.getInstance()
      .getLst({
        cate_id: productSearchParams.cate_id,
        keySearch: productSearchParams.keySearch,
        limit: productSearchParams.limit,
        page: productSearchParams.page,
      })
      .then((resp: any) => {
        dispatch(setLoading(true));
        if (resp.status === 200) {
          dispatch(setLoading(false));
          setListPro(resp.data.products);
          setTotalProduct(resp.data.totalProducts);
          setTotalPage(resp.data.totalPages);
        }
      })
      .catch((err: any) => {
        dispatch(setLoading(false));
      });
  }, [productSearchParams.timer, productSearchParams.page]);
  useEffect(() => {
    CateService.getInstance()
      .getLstCate({
        keysearch: "",
        limit: 100,
        page: 1,
      })
      .then((resp: any) => {
        if (resp.status === 200) {
          setListCate(resp.data.categories);
        }
      });
  }, []);
  const handleClickClose = () => {
    setOpen(false);
  };

  const formatDate = (date: any) => {
    return format(new Date(date), "dd/MM/yyyy hh:mm:ss");
  };

  const addProduct = () => {
    productRef.current = null;
    setOpen(true);
  };

  const editProduct = (prod: any) => {
    productRef.current = prod;
    setOpen(true);
  };
  const handleCategoryChange = (e: any) => {
    setProductSearchParams({
      ...productSearchParams,
      [e.target.name]: e.target.value,
      timer: new Date().getTime(),
      page:1
    });
  };
  const deleteProduct = (id: any) => {
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
        ProductService.getInstance()
          .deleteProd(id)
          .then((resp: any) => {
            dispatch(setLoading(false));
            setProductSearchParams({
              ...productSearchParams,
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
            <div className="col-5 d-flex">
              <select
                className="form-control"
                value={productSearchParams.cate_id}
                onChange={handleCategoryChange}
                name="cate_id"
              >
                <option value="">Select Category</option>
                {listCate.map((cate: any) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
              <input
                className="form-control"
                type="text"
                placeholder="ProductName"
                name="keySearch"
                value={productSearchParams.keySearch || ""}
                onChange={handleChangeSearch}
                onKeyUp={handleKeyUpSearch}
              />
              <button
                className="btn btn-info"
                onClick={() => {
                  setProductSearchParams({
                    ...productSearchParams,
                    timer: new Date().getTime(),
                  });
                }}
              >
                Search
              </button>
            </div>
            <div>
              <button className="btn btn-primary" onClick={addProduct}>
                add
              </button>
            </div>
          </div>
          <h3>List Product</h3>
          <h5>TotalProduct:{totalProduct}</h5>
          <table className="table table-bordered  ">
            <thead>
              <tr className="text-center">
                <th scope="col">No</th>
                <th scope="col">ProductCode</th>
                <th scope="col">ProductName</th>
                <th scope="col">CateName</th>
                <th scope="col">Price</th>
                <th scope="col">CreateDate</th>
                <th scope="col">UpdatedAt</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {totalProduct ===0 && <h3>No data</h3>}
              {listPro.map((p: any, index: number) => (
                <tr key={p.id}>
                  <th scope="row" className="text-center">
                    {indexOfFirstItem+index + 1}
                  </th>
                  <td className="text-center">{p.prod_code}</td>
                  <td className="text-center">{p.prod_nm}</td>
                  <td className="text-center">{p.cateName}</td>
                  <td className="text-end">{p.prod_price}</td>
                  <td className="text-center">{formatDate(p.regtDt)}</td>
                  <td className="text-center">{formatDate(p.updDt)}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-secondary "
                      onClick={() => editProduct(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger "
                      onClick={() => deleteProduct(p.id)}
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
            <h3 className="m-1">{productSearchParams.page}</h3>
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
            <ProductForm
              prod={productRef.current}
              closeForm={handleClickClose}
              onSave={() => {
                setProductSearchParams((prev) => ({
                  ...prev,
                  timer: new Date().getTime(),
                }));
              }}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
