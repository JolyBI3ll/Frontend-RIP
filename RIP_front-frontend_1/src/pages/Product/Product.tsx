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
        source.param_sex && params.push({key: "Дата рождения", value: source.param_sex})
        source.param_material && params.push({key: "Рост", value: source.param_material})
        source.param_type &&  params.push({key: "Вес", value: source.param_type})
        source.param_color && params.push({key: "Биография", value: source.param_color})
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
                {id && product && <Breadcrumbs pages={[ { link: `${getBase()}/products/${id}/`, title: `${product.title}` } ]} />}
            </Row>
            <Row>
                {product && parameters && id && <ProductInfo pk={parseInt(id)} title={product.title} cnt={product.cnt} parameters={parameters} image={product.image} />}
            </Row>
        </Container>
    )
}

export default ProductPage;