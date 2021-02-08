
import { Product } from "../product.model";
import * as actions from './products.actions'

export interface State{
    products: Product[],
    error:string,
    loading:boolean,
    product: Product,
    categories:any[]
}

const initialState :State = {
    products : [],
    error : null,
    loading : false,
    product: null,
    categories: [
        {
          name: 'משקאות וקינוחים',
          subCtg: [{name:'משקאות' ,value: 'drink'},{ name : 'קינוחים', value: 'dessert'}],
          value: 'drink'
        },
        {
            name: 'ארוחות ערב',
            subCtg: [{name: 'פיצות',value: 'pizza' },{name :'טוסטים',value: 'toast'},{name :  'מרקים',value: 'soup'}],
            value: 'dinner'
         },
        {
          name: 'ארוחות צהריים',
          subCtg: [{name :'המבורגרים',value: 'hamburger'}, {name : 'שניצלים', value: 'shnitzhel'},{name :  'בשר',value : 'meat'}],
          value: 'lunch'
        },
        {
          name: 'ארוחות בוקר',
          subCtg: [{name : 'חביתות',value: 'omlet'},{name: 'פיצות' ,value : 'pizza'} ,{name : 'טוסטים',value: 'toast'}, {name:'סלטים', value: 'salad'}],
          value: 'breakfast'
        }
    ]
}

export function productReducer(state = initialState, action:any){
    switch(action.type){
        case action.ADD_PROD_START:
        case actions.GET_ADMIN_PRODS_START:
        case actions.EDIT_PROD_START:
        case actions.START_DELETE_PROD:
        case actions.GET_ALL_PRODS_START:
            return {
                ...state,
                loading:true,
                error :null
            }
        case actions.GET_ALL_PRODS:
        return {
                ...state,
                loading:false,
                products:state.products
            }
        case actions.GET_ALL_PRODS_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                products: action.payload
            }
        case actions.ADD_PROD_SUCCESS: 
            return {
                ...state, 
                products: [...state.products, action.payload],
                loading:false,
                error: null
        }
        case actions.ACTION_FAIL:
            return {
                ...state,
                prodcuts:null,
                loading: false,
                error : action.payload
            }
        case actions.GET_ADMIN_PRODS_SUCCESS:
            return {
               ...state,
               products: action.payload,
               error:null,
               loading:false
            }
        case actions.GET_ADMIN_PRODS:
            return {
                ...state,
                products: state.products
            }
        case actions.GET_SINGLE_PROD_START:
            return {
                ...state,
                error:null,
                loading:false,
                product: state.products.filter(prod=>prod._id === action.payload)[0]
            }
        case actions.ADD_PROD_SUCCESS:
            return {
                ...state,
                error:null,
                loading:false,
                products: [...state.products, action.payload]
            }
        case actions.EDIT_PROD_SUCEESS:
            const updatedProducts = state.products.slice();
            const updatedProduct = updatedProducts.find(prod=>prod._id === action.payload._id);
            updatedProducts[updatedProducts.indexOf(updatedProduct)] = action.payload;
            return {
                ...state,
                error:null,
                loading:false,
                products: updatedProducts
            }
        case actions.DELETE_SUCCESS:
            return{
                ...state,
                loading:false,
                error:null,
                products: state.products.filter(prod=>prod._id !== action.payload)
        }
        case actions.GET_CATEGORIES:
            return {
                ...state,
                categories: state.categories
            } 
               
        
        default : return state;
    }
}



