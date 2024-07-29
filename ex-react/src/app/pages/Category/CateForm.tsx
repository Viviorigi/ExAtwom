import React, { useEffect, useState } from "react";
import { CategoryDto } from "../../models/CategoryDTO";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { CateService } from "../../Services/CateService";
import { useAppDispatch } from "../../store/hook";
import { setLoading } from "../../reducers/spinnerSlice";

export default function CateForm(props: any) {
  const { closeForm, onSave, cate } = props;
  const [cateSave, setCateSave] = useState<CategoryDto>(new CategoryDto());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (cate) {
      setCateSave({ ...cate });
    }
  }, [cate]);

  const handleChangeText = (event: any) => {
    const { name, value } = event.target;
    setCateSave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setCateSave((prev) => ({
      ...prev,
      description: data,
    }));
  };

  const setCateState = () => {
    setCateSave((prev: CategoryDto) => {
      return {
        ...prev,
        name: prev.name || "",
      };
    });
  };

  const chk = () => {
    if (cateSave.name === undefined || cateSave.name === "") {
      setCateState();
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
      text: cate === null ? "Do you want to add new category?" : `Do you want to update category?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.value) {
        if(cate){
          dispatch(setLoading(true));
          CateService.getInstance().updateCate(cateSave,cate.id)
          .then((resp: any) => {
            setTimeout(() => {
              dispatch(setLoading(false));
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
        }else{  
          dispatch(setLoading(true));
          CateService.getInstance().createCate(cateSave).then((resp: any) => {
            if(resp){
              setTimeout(() => {
                dispatch(setLoading(false));
                toast.success( "Add successfully");
                closeForm();
                onSave();  
              }, 1000);         
            }
            
          })
          .catch((error: any) => {
            dispatch(setLoading(false));
            closeForm();
            toast.error( "Add Failed");
          });
        }
        
      }
    });
  };

  return (
    <div>
      <h3>{cate === null ? "Add" : "Edit"}</h3>
      <div className="form-group ">
        <label>Category Name <span className="text-danger">(*)</span></label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={cateSave.name || ""}
          onChange={handleChangeText}
          placeholder="Enter CateName"
        />
        <div
          className={`invalid-feedback ${cateSave.name?.toString() === "" ? "d-block" : ""}`}
          style={{ fontSize: "100%", color: "red" }}
        >
          Không được để trống
        </div>
      </div>
      <div className="form-group mt-3 mb-3">
        <label>Description</label>
        <CKEditor
          editor={ClassicEditor}
          data={cateSave.description || ""}
          onChange={handleEditorChange}
          
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={save}>
       {cate?"Update":"Save"}
      </button>
    </div>
  );
}
