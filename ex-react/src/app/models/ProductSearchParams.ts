export class ProductSearchParams{
    cate_id:number| "";
    keySearch:string
    page:number;
    limit:number;
    timer:number;
    constructor(cate_id:number|"",keySearch:string,page:number,limit:number,timer:number){
        this.cate_id=cate_id;
        this.keySearch=keySearch
        this.page=page;
        this.limit=limit;
        this.timer=timer;
    }
}