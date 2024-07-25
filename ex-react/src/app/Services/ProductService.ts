import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUrlUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import { HeadersUtil } from "../utils/HeaderUtil";

export class ProductService {
    private static _productService: ProductService;

    public static getInstance(): ProductService {
        if (!ProductService._productService) {
            ProductService._productService = new ProductService();
        }
        return ProductService._productService;
    }

    public getLst(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/products/lstProd`, params);
        return axios.get(url, {
            headers: HeadersUtil.getHeaders(),
        });
    }
    public deleteProd(id:number){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/products/${id}`);
        return axios.delete(url, {
            headers: HeadersUtil.getHeaders(),
        });
    }
    public createProd(prod:any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/products`);    
        return axios.post(url,prod, {
            headers: HeadersUtil.getHeaders(),
        });
    }
    public updateProd(prod:any,id:number){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/products/${id}`);    
        return axios.put(url,prod, {
            headers: HeadersUtil.getHeaders(),
        });
    }
}