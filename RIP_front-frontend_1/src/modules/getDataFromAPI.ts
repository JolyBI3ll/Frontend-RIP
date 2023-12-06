import { defaultProduct } from "../assets/MockObjects"

 export interface Product {
    id: number,
    full_name: string,
    file_extension: 'jpg' | 'png',
    status: 'A' | 'N',
    description: string,
    weight: string,
    height: string,
    bdate: string,
    last_modified: string,
    image: string
}

 interface t {
    RequestId: number
    Participants: Product[]
}


export const getProductList = async (title: string): Promise<t> => {
    // return fetch(`http://127.0.0.1:8080/products/?status=A&type=${type}&price_min=${priceMin}&price_max=${priceMax}&title=${title}`)
    //     .then((response) => response.json())
    //     .catch(() => [])
    console.log("here")
    try {
        const response = await fetch(`http://127.0.0.1:8000/participants/?status=A&title=${title}`)
        console.log(response)
        return response.json()
    } catch (error) {
        let result = []
        for (let i = 1; i <= 3; ++i) {
            result.push(defaultProduct(i))
        }
        result = result.filter((product) => {
            return (title == '' || product.full_name.toLowerCase().includes(title.toLowerCase()))
        })
        return {"RequestId":0, "Participants": result}
    }
    
}


export const getProduct = async (id: string): Promise<Product> => {
    // return fetch(`http://127.0.0.1:8080/products/${id}/`)
    //     .then((response) => response.json())
    //     .catch(() => undefined)
    try {
        const response = await fetch(`http://127.0.0.1:8000/participants/${id}/`)
        const result = await response.json()
        return result
    } catch (error) {
        return defaultProduct(1)
    }
    
}
