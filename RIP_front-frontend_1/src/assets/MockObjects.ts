import defaultImage from '../assets/default.jpg';

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

export const defaultProduct = (id: number): Product => {
    return {
        pk: id,
        title: `Базовые очки ${id}`,
        file_extension: 'jpg',
        price: id * 1000,
        cnt: id,
        status: 'A',
        type: 'frames',
        param_sex: "мужские",
        param_material: "пластик",
        param_type: "ободковая",
        param_color: "зелёный",
        param_form: "круглые",
        param_brand: "top market",
        last_modified: "today",
        image: defaultImage
    }
}