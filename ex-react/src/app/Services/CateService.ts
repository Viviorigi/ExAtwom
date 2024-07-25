import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUrlUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import { HeadersUtil } from "../utils/HeaderUtil";

export class CateService {
    private static _cateService: CateService;

    public static getInstance(): CateService {
        if (!CateService._cateService) {
            CateService._cateService = new CateService();
        }
        return CateService._cateService;
    }

    public getLstCate(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/categories`, params);
        
        // "http://localhost:8397/api/cate/getLst?limit=10&page=1&keySearch=a"

        return axios.get(url, {
            headers: HeadersUtil.getHeaders(),
        });
    }
    public deleteCate(id:number){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/categories/${id}`);
        return axios.delete(url, {
            headers: HeadersUtil.getHeaders(),
        });
    }
    public createCate(cate:any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/categories`);    
        return axios.post(url,cate, {
            headers: HeadersUtil.getHeaders(),
        });
    }
    public updateCate(cate:any,id:number){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/categories/${id}`);    
        return axios.put(url,cate, {
            headers: HeadersUtil.getHeaders(),
        });
    }
}