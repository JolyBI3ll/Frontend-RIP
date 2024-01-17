import image_1 from './default.jpg'
import image_2 from './default1.jpg'
import image_3 from './default2..jpg'

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

const defaultProduct_1 = (): Product => {
    return {
        id: 1,
        full_name: 'Михайлов Денис Андреевич',
        file_extension: 'jpg',
        status: 'A',
        description: "Даниил Михайлов - профессиональный теннисист, известный своей мощной подачей и выносливостью на корте. Занимает 5-е место в мировом рейтинге и имеет в своем активе победы на нескольких 'Гранд-слим' турнирах.",
        weight: '85',
        height: '190',
        bdate: "1988-05-23",
        last_modified: "today",
        image: image_1
    }
}

const defaultProduct_2 = (): Product => {
    return {
        id: 2,
        full_name: 'Волков Алексей Михайлович',
        file_extension: 'jpg',
        status: 'A',
        description: "Алексей Волков известен своей поразительной скоростью и техникой ведения мяча. Сыграл в более чем 100 матчах за национальную сборную России и является лидером ассистов в своем клубе, 'Зенит'. Выиграл титул лучшего футболиста России три года подряд.",
        weight: '78',
        height: '185',
        bdate: "1995-08-14",
        last_modified: "today",
        image: image_2
    }
}

const defaultProduct_3 = (): Product => {
    return {
        id: 3,
        full_name: 'Ли Чен Сю',
        file_extension: 'jpg',
        status: 'A',
        description: "Ли Чен - китайский бадминтонист, известный своей взрывной скоростью и агрессивным стилем игры. Его реакция и техническое мастерство делают его одним из лучших игроков в мире. Он выиграл золото на Азиатских играх и имеет несколько титулов BWF World Tour.",
        weight: '65',
        height: '175',
        bdate: "1996-04-26",
        last_modified: "today",
        image: image_3
    }
}
const getDefaultProductList = (searchValue: string): Product[] => {
    let result = [defaultProduct_1(), defaultProduct_2(), defaultProduct_3()]
    result = result.filter((product) => {
        return (searchValue == '' || product.full_name.toLowerCase().includes(searchValue.toLowerCase()))
    })
    return result
}

export const getDefaultProduct = (id: number) => {
    if (id == 1) {
        return defaultProduct_1()
    } else if (id == 2) {
        return defaultProduct_2()
    } else {
        return defaultProduct_3()
    }
}

export const getDefaultResponse = (searchValue: string): Response => {
    return {
        RequestId: -1,
        Participants: getDefaultProductList(searchValue)
    }
}

// const defaultProduct = (id: number): Product => {
//     return {
//         id: id,
//         full_name: `Участник ${id}`,
//         file_extension: 'jpg',
//         status: 'A',
//         description: "description",
//         weight: '80',
//         height: '180',
//         bdate: "2023-01-01",
//         last_modified: "today",
//         image: defaultImage
//     }
// }

// const getDefaultProductList = (count: number, searchValue: string): Product[] => {
//     let result = []
//     for (let i = 1; i <= count; ++i) {
//         result.push(defaultProduct(i))
//     }
//     result = result.filter((product) => {
//         return (searchValue == '' || product.full_name.toLowerCase().includes(searchValue.toLowerCase()))
//     })
//     return result
// }

// export const getDefaultResponse = (count: number, searchValue: string): Response => {
//     return {
//         RequestId: -1,
//         Participants: getDefaultProductList(count, searchValue)
//     }
// }