import {useQuery} from "@tanstack/react-query";
import {PRODUCTS} from "@/components/consts/TanstackConsts";
import ProductsService from "@/api/Products.service";
import {EnumSort} from "@/components/interfaces/sorting.interface";
import {IProduct} from "@/components/interfaces/Product.interface";
import {getAllProducts} from "@/api/Actions/Products.actions";

const UseGetAllProducts = ({products, sort, category, search, excludeId}:
                                { products?: IProduct[], sort?: EnumSort, category?: string, search?: string, excludeId?: number }) => {

    return useQuery([PRODUCTS, sort, category, search, excludeId], () => ProductsService.getAllProducts(sort, category, search, excludeId)
        , {
            initialData: products as any,
            onError: (err) => {
                console.log("Something went wrong in useGetAllProducts.ts: ", err);
            }
        }
    );
};

export default UseGetAllProducts;