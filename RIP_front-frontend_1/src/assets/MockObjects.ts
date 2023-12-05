import defaultImage from '../assets/default.jpg';

export interface Product {
    pk: number,
    title: string,
    file_extension: 'jpg' | 'png',
    status: 'A' | 'N',
    description: string,
    weight: string,
    height: string,
    bdate: string,
    last_modified: string,
    image: string
}

export const defaultProduct = (id: number): Product => {
    return {
        pk: id,
        title: `Участник ${id}`,
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