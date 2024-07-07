import {IProduct, IProductEntity} from "@/components/interfaces/Product.interface";
import {BackendSortingInterface, EnumSort} from "@/components/interfaces/sorting.interface";
import {axiosClassic} from "@/api/api";
import sortTypeConverter from "@/components/utils/SortTypeConverter";
import {createClient} from "@supabase/supabase-js";

const productURL = '/products';

const ProductsService = {
    /*async getAllProducts(sort?: EnumSort | undefined, category?: string, search?: string, excludeId?: number, page?: number, limit?: number) {
        let convertedSort: BackendSortingInterface | undefined = undefined;
        if (sort) {
            convertedSort = sortTypeConverter(sort);
        }
        let {data} = await axiosClassic.get<IProduct[]>(productURL, {
            params: {
                sort: convertedSort?.sortType,
                order: convertedSort?.sortOrder,
                category: category,
                search: search ? search : undefined,
                excludeId: excludeId,
                page: page,
                limit: limit
            }
        });
        return data;
    },*/
    async getAllProducts(sort?: EnumSort | undefined, category?: string, search?: string, excludeId?: number, page?: number, limit?: number) {
        let convertedSort: BackendSortingInterface | undefined = undefined;
        let ascending = false;
        let type = "created_at";
        if (sort) {
            convertedSort = sortTypeConverter(sort);
            ascending = convertedSort.sortOrder === "asc";
            type = convertedSort.sortType === "price" ? "price" : "created_at";
        }
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
            , process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '');
        if (category && category !== "all") {
            const {data, error} = await supabase.from('product')
                .select('*')
                .eq('category', category)
                .ilike('name', `%${search}%`)
                .neq('id', excludeId ?? 0)
                .order(type, {ascending})
                .range(page ?? 0, limit ?? 10);
            const {data: imagesData, error: ErrorImages} = await supabase.from('product_images').select('*');
            const {data: reviewsData, error: ErrorReviews} = await supabase.from('reviews').select('*');
            let products : IProductEntity[] = [];
            for (let i = 0; i < data!.length; i++) {
                products.push({
                    id: data![i].id,
                    name: data![i].name,
                    slug: data![i].slug,
                    description: data![i].description,
                    price: data![i].price,
                    reviews: reviewsData!.filter((review) => review.product_id === data![i].id).map((review) => review.review),
                    images: imagesData!.filter((image) => image.product_id === data![i].id).map((image) => image.image),
                    createdAt: data![i].created_at,
                    updatedAt: data![i].updated_at
                });
            }
            if(error) {
                console.log(error);
            }
            return products;
        }
        else {
            const { data, error } = await supabase
                .from('product')
                .select('*')
                .ilike('name', `%${search}%`)
                .neq('id', excludeId ?? 0)
                .order(type, {ascending})
                .range(page ?? 0, limit ?? 10);

            const {data: imagesData, error: ErrorImages} = await supabase.from('product_images').select('*');
            const {data: reviewsData, error: ErrorReviews} = await supabase.from('reviews').select('*');
            let products : IProductEntity[] = [];
            for (let i = 0; i < data!.length; i++) {
                products.push({
                    id: data![i].id,
                    name: data![i].name,
                    slug: data![i].slug,
                    description: data![i].description,
                    price: data![i].price,
                    reviews: reviewsData!.filter((review) => review.product_id === data![i].id).map((review) => review.review),
                    images: imagesData!.filter((image) => image.product_id === data![i].id).map((image) => image.image),
                    createdAt: data![i].created_at,
                    updatedAt: data![i].updated_at
                });
            }
            if(error) {
                console.log(error);
            }
            return products;
        }
    },
    /*async getProductById(id: number) {
        return axiosClassic.get<IProduct>(productURL + "/" + id);
    },*/
    /*async getAllButCurrentProduct(id: number) {
        const {data} = await axiosClassic.get<IProduct[]>(productURL + "/allButCurrent/" + id);
        return data;
    },*/
     /*async getProductBySlug(slug: string) {
        return axiosClassic.get<IProduct>(productURL + "/slug/" + slug);
    },*/
    async getProductBySlug(slug: string) {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
            , process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '');
        const {data: productData, error} = await supabase.from('product').select('*').eq('slug', slug);
        const {data: imagesData, error: ErrorImages} = await supabase.from('product_images').select('*');
        const {data: reviewsData, error: ErrorReviews} = await supabase.from('reviews').select('*');
        let data : IProductEntity = {
            id: productData![0].id,
            name: productData![0].name,
            slug: productData![0].slug,
            description: productData![0].description,
            price: productData![0].price,
            reviews: reviewsData!.filter((review) => review.product_id === productData![0].id).map((review) => review),
            images: imagesData!.filter((image) => image.product_id === productData![0].id).map((image) => image.image),
            createdAt: productData![0].created_at,
            updatedAt: productData![0].updated_at
        };
        return {data};
    },
}

export default ProductsService;