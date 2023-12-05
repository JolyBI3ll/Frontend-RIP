import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Product, getProductList} from '../../modules/getDataFromAPI'
import ProductCard from '../../components/ProductCard/ProductCard';
import { Filter }  from '../../components/Filter/Filter';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import "./ProductList.css"

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// TODO
// 5. Navbar из списка базовых страниц
// 7. Развернуть фронтенд на Github Pages
// 8. ТЗ

const ProductListPage: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [type, setType] = useState<string>('');

    const location = useLocation();
    const request = new URLSearchParams(location.search);

    const requestTitle = request.get('title');

    const requestType = request.get('type');

    const title = (requestTitle ? requestTitle : '');

    useEffect(() => {
        requestType && setType(requestType);
        getProductList(title)
            .then((response) => {
                setProducts(response);
            })
    }, [type]);

    return (
        <Container>
            <Row>
                <Breadcrumbs pages={[]} />
            </Row>
            <Row style={{ display: "flex" }}>
                <Col style={{ width: "22%", margin: "30px" }}>
                    {
                    <Filter
                        title={title}
                    />}
                </Col>
                <Col style={{ marginBottom: "30px", marginLeft: "10px" }}>
                    <div id="box">
                        {products && products.map((product) => (
                            <ProductCard key={product.pk.toString()}
                                pk={product.pk}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                cnt={product.cnt}/>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductListPage