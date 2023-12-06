import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product, getProduct } from '../../modules/getDataFromAPI'
import ProductInfo, {Param} from '../../components/ProductInfo/ProductInfo'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import "./Product.css"
import { Container, Row } from 'react-bootstrap';
import { getBase } from '../../../path_config.ts';

const ProductPage: FC = () => {
    const { id } = useParams();

    const [product, setProduct] = useState<Product>();
    const [parameters, setParameters] = useState<Param[]>([]);

    const getParams = (source: Product) => {
        let params: Param[] = []
        source.bdate && params.push({key: "Дата рождения", value: source.bdate})
        source.height && params.push({key: "Рост", value: source.height})
        source.weight &&  params.push({key: "Вес", value: source.weight})
        source.description && params.push({key: "Биография", value: source.description})
        return params
    }

    useEffect(() => {
        id && getProduct(id)
            .then((response) => {
                setProduct(response);
                setParameters(getParams(response));
            })
            .then(() => {
                console.log(product);
                console.log(parameters);
            })
    }, [id]);

    return (
        <Container>
            <Row>
                {id && product && <Breadcrumbs pages={[ { link: `${getBase()}/products/${id}/`, title: `${product.full_name}` } ]} />}
            </Row>
            <Row>
                {product && parameters && id && <ProductInfo pk={parseInt(id)} title={product.full_name} parameters={parameters} image={product.image} />}
            </Row>
        </Container>
    )
}

export default ProductPage;