export interface IMember{
    page:number;
    per_page:number;
    total:number;
    total_pages:number;
    data:IMemberInfo[];
}

export interface IMemberInfo{
    id:number;
    email:string;
    first_name:string;
    last_name:string;
    avatar:string;
}