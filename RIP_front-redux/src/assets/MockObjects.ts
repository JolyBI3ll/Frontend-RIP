import defaultImage from '../assets/default.jpg';


interface Product {
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

interface Response {
    RequestId: number
    Participants: Product[]
}

const defaultProduct = (id: number): Product => {
    return {
        id: id,
        full_name: `Участник ${id}`,
        file_extension: 'jpg',
        status: 'A',
        description: "description",
        weight: '80',
        height: '180',
        bdate: "2023-01-01",
        last_modified: "today",
        image: defaultImage
    }
}

const getDefaultProductList = (count: number, searchValue: string): Product[] => {
    let result = []
    for (let i = 1; i <= count; ++i) {
        result.push(defaultProduct(i))
    }
    result = result.filter((product) => {
        return (searchValue == '' || product.full_name.toLowerCase().includes(searchValue.toLowerCase()))
    })
    return result
}

export const getDefaultResponse = (count: number, searchValue: string): Response => {
    return {
        RequestId: -1,
        Participants: getDefaultProductList(count, searchValue)
    }
}