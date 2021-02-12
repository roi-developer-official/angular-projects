
export interface Product { 
    _id?:string;
    title:string;
    name:string;
    price:number;
    imageUrl:string;
    description:string;
    ingredients:string[];
    categories:string[];
    homeProd:boolean;
}

export interface OrderProduct{
    _id:string,
    quantity:number
}

