import React, { useEffect, useState } from "react";
import { ProductSearchParams } from "../../models/ProductSearchParams";
import axios from "axios";
import { format } from "date-fns";
import { ProductService } from "../../Services/ProductService";

export default function ListProbyCategory(props: any) {
  const { cateId } = props;
  const [listProByCate, setlistProByCate] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [proByCateParams, setproByCateParams] = useState<ProductSearchParams>(
    new ProductSearchParams(cateId, "", 1, 5, new Date().getTime())
  );
  const indexOfLastItem = proByCateParams.page * proByCateParams.limit;
  const indexOfFirstItem = indexOfLastItem - proByCateParams.limit;
  const prev = () => {
    if(proByCateParams.page > 1){
      setproByCateParams(() => ({
        ...proByCateParams,
        page: proByCateParams.page - 1,
      }));
    }
  };
  const next = () => {
    if(proByCateParams.page < totalPage){
      setproByCateParams(() => ({
        ...proByCateParams,
        page: proByCateParams.page + 1,
      }));
    }
  };
  useEffect(() => {
    ProductService.getInstance()
      .getLst({
        cate_id: proByCateParams.cate_id,
        page: proByCateParams.page,
        limit: proByCateParams.limit,
      })
      .then((resp: any) => {
        if (resp.status === 200) {
          setlistProByCate(resp.data.products);
          setTotalPage(resp.data.totalPages)
        }
      })
      .catch((err: any) => {});
  }, [proByCateParams.page]);
  const formatDate = (date: any) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <div>
      <h1>List Product </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">ID</th>
            <th scope="col">ProductCode</th>
            <th scope="col">ProductName</th>
            <th scope="col">CateName</th>
            <th scope="col">Price</th>
            <th scope="col">CreateDate</th>
            <th scope="col">UpdatedAt</th>
          </tr>
        </thead>
        <tbody>
          {listProByCate.length===0 && <h3 className="text-center m-3">No Data</h3>}
          {listProByCate.map((p: any, index: number) => (
            <tr key={p.id}>
              <th scope="row">{indexOfFirstItem+index + 1}</th>
              <th scope="row">{p.id}</th>
              <td>{p.prod_code}</td>
              <td>{p.prod_nm}</td>
              <td>{p.cateName}</td>
              <td>{p.prod_price}</td>
              <td>{formatDate(p.regtDt)}</td>
              <td>{formatDate(p.updDt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={prev}>
          prev
        </button>
        <h3 className="m-1">{proByCateParams.page}</h3>
        <button className="btn btn-success" onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
}
