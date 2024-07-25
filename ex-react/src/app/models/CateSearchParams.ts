export class CateSearchParams{
    keySearch?:string;
    page:number;
    limit:number;
    timer:number;
    
    constructor(keySearch:string,page:number,limit:number,timer: number){
        this.keySearch=keySearch;
        this.page=page;
        this.limit=limit;
        this.timer = timer;
    }
}