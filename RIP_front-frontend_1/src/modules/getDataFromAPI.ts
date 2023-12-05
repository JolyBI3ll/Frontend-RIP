import { defaultProduct } from "../assets/MockObjects"

export interface Product {
    pk: number,
    title: string,
    file_extension: 'jpg' | 'png',
    price: number,
    cnt: number,
    status: 'A' | 'N',
    type: 'frames' | 'sunglasses' | 'lenses',
    param_sex?: string,
    param_material?: string,
    param_type?: string,
    param_color?: string,
    param_form?: string,
    param_time?: string,
    param_brand: string,
    last_modified: string,
    image: string
}


export const getProductList = async (title: string): Promise<Product[]> => {
    // return fetch(`http://127.0.0.1:8080/products/?status=A&type=${type}&price_min=${priceMin}&price_max=${priceMax}&title=${title}`)
    //     .then((response) => response.json())
    //     .catch(() => [])
    try {
        const response = await fetch(`http://127.0.0.1:8080/participants/?status=A&title=${title}`)
        const result = await response.json()
        return result
    } catch (error) {
        let result = []
        for (let i = 1; i <= 3; ++i) {
            result.push(defaultProduct(i))
        }
        result = result.filter((product) => {
            return (title == '' || product.title.toLowerCase().includes(title.toLowerCase()))
        })
        return result
    }
    
}


export const getProduct = async (id: string): Promise<Product> => {
    // return fetch(`http://127.0.0.1:8080/products/${id}/`)
    //     .then((response) => response.json())
    //     .catch(() => undefined)
    try {
        const response = await fetch(`http://127.0.0.1:8080/products/${id}/`)
        const result = await response.json()
        return result
    } catch (error) {
        return defaultProduct(1)
    }
    
}
