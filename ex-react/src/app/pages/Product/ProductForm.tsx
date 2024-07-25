import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hook";
import { ProductDto } from "../../models/ProductDTo";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { setLoading } from "../../reducers/spinnerSlice";
import { ProductService } from "../../Services/ProductService";
import { toast } from "react-toastify";
import { CateService } from "../../Services/CateService";

export default function ProductForm(props: any) {
  const { closeForm, onSave, prod } = props;
  const [prodSave, setProdSave] = useState<ProductDto>(new ProductDto());
  const [listCate, setListCate] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (prod) {
      setProdSave({ ...prod });
    }
    console.log(prodSave);
    
  }, [prod]);

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

  const handleChangeText = (event: any) => {
    const { name, value } = event.target;
    setProdSave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: any) => {
    setProdSave({
      ...prodSave,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeNumber = (event: any) => {
    const { name, value } = event.target;
    setProdSave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setProdSave((prev) => ({
      ...prev,
      description: data,
    }));
  };

  const setProState = () => {
    setProdSave((prev: ProductDto) => {
      return {
        ...prev,
        prod_code: prev.prod_code || "",
        prod_nm: prev.prod_nm || "",
        prod_price: prev.prod_price || 0,
        description: prev.description,
        cate_id: prev.cate_id,
      };
    });
  };

  const chk = () => {
    if (prodSave.prod_code === undefined || prodSave.prod_code === "") {
      setProState();
      return false;
    }
    if (prodSave.prod_nm === undefined || prodSave.prod_nm === "") {
      setProState();
      return false;
    }
    if (
      prodSave.prod_price === undefined ||
      prodSave.prod_price.toString() === ""
    ) {
      setProState();
      return false;
    }
    return true;
  };

  const save = () => {
    if (!chk()) {
      return;
    }

    Swal.fire({
      title: `Confirm`,
      text:
        prod === null
          ? "Do you want to add a new product?"
          : `Do you want to update the product?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.value) {
        if (prod) {
          dispatch(setLoading(true));
          ProductService.getInstance()
            .updateProd(prodSave, prod.id)
            .then((resp: any) => {
              setTimeout(() => {
                dispatch(setLoading(false));
                Swal.fire({
                  title: "Update",
                  text: "Update successfully",
                  icon: "success",
                });
                toast.success("Update successfully");
                closeForm();
                onSave();
              }, 1000);
            })
            .catch((error: any) => {
              dispatch(setLoading(false));
              closeForm();
              toast.error("Update Failed");
            });
        } else {
          dispatch(setLoading(true));
          ProductService.getInstance()
            .createProd(prodSave)
            .then((resp: any) => {
              if (resp) {
                setTimeout(() => {
                  dispatch(setLoading(false));
                  Swal.fire({
                    title: "Add",
                    text: "Add successfully",
                    icon: "success",
                  });
                  toast.success("Add successfully");
                  closeForm();
                  onSave();
                }, 1000);
              }
            })
            .catch((error: any) => {
              dispatch(setLoading(false));
              closeForm();
              toast.error("Add Failed");
            });
        }
      }
    });
  };

  return (
    <div>
      <h3>{prod === null ? "Add Product" : "Edit Product"}</h3>
      <div className="form-group ">
        <label>Product Code</label>
        <input
          type="text"
          name="prod_code"
          className="form-control"
          value={prodSave.prod_code || ""}
          onChange={handleChangeText}
          placeholder="Enter ProCode"
        />
        <div
          className={`invalid-feedback ${
            prodSave.prod_code?.toString() === "" ? "d-block" : ""
          }`}
          style={{ fontSize: "100%", color: "red" }}
        >
          Không được để trống
        </div>
      </div>
      <div className="form-group ">
        <label>Product Name</label>
        <input
          type="text"
          name="prod_nm"
          className="form-control"
          value={prodSave.prod_nm || ""}
          onChange={handleChangeText}
          placeholder="Enter Product Name"
        />
        
        <div
          className={`invalid-feedback ${
            prodSave.prod_nm?.toString() === "" ? "d-block" : ""
          }`}
          style={{ fontSize: "100%", color: "red" }}
        >
          Không được để trống
        </div>
      </div>
      <div className="form-group ">
        <label>Product Price</label>
        <input
          type="number"
          name="prod_price"
          className="form-control"
          value={prodSave.prod_price || ""}
          onChange={handleChangeNumber}
          placeholder="Enter Product Price"
        />
        <div
          className={`invalid-feedback ${
            prodSave.prod_price?.toString() === "" ? "d-block" : ""
          }`}
          style={{ fontSize: "100%", color: "red" }}
        >
          Không được để trống
        </div>
      </div>
      <div className="form-group ">
        <label>Select Category</label>
        <select
          className="form-control"
          value={prodSave.cate_id || ""}
          onChange={handleCategoryChange}
          name="cate_id"
        >
           <option value="">Select Category</option> 
          {listCate.map((cate: any) => (
            <option key={cate.id} value={cate.id} selected={cate.id === prodSave.cate_id}>
            {cate.name}
          </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3 mb-3">
        <label>Description</label>
        <CKEditor
          editor={ClassicEditor}
          data={prodSave.description || ""}
          onChange={handleEditorChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={save}>
        {prod ? "Update" : "Save"}
      </button>
    </div>
  );
}
