import { FC, useState, useEffect } from 'react';
import { useSsid } from "../../hooks/useSsid.ts";
import { useAuth } from '../../hooks/useAuth.ts';
import { useProductFilter } from '../../hooks/useProductFilter.ts';

import axios from "axios";
import { getDefaultResponse } from '../../assets/MockObjects.ts';

import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import Filter from '../../components/Filter/Filter.tsx';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx';
import Loader from '../../components/Loader/Loader.tsx';

import { Col, Container, Row } from 'react-bootstrap';
import "./ProductListPage.css";
import CartButton from '../../components/CartButton/CartButton.tsx';


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

interface Response {
    RequestId: number
    Participants: Product[]
}

const ProductListPage: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)

    const [ response, setResponse ] = useState<Response> ({
        RequestId: -1,
        Participants: [],
    })

    const { cache, searchValue, setCache } = useProductFilter()

    const { session_id } = useSsid()
    const { is_authenticated } = useAuth()

    const getFilteredProducts = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/participants/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    title: searchValue,
                },
                signal: AbortSignal.timeout(1000)
            })
            setResponse(data)
            setCache(data.Participants)
        } catch (error) {
            setResponse(getDefaultResponse(3, searchValue))
        }
    }

    useEffect(() => {
        getFilteredProducts().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    const addToCart = async (participant_id: number) => {
        await axios(`http://localhost:8000/participants/${participant_id}/`, {
            method: "POST",
            headers: {
                'authorization': session_id
            },
        })
        await getFilteredProducts()
    }

    return (
        <> {loading ? <Loader /> :
        <Container>
            <Row style={is_authenticated ? { position: 'relative'} : {}}>
                <Breadcrumbs pages={[]} />
            </Row>
            <Row style={is_authenticated ? { display: 'flex', position: 'relative', top: '-25px' } : {display: 'flex'}}>
                <Col style={{ width: "22%", margin: "30px", marginTop: "45px" }}>
                    <Filter
                        send={getFilteredProducts}
                    />
                </Col>
                <Col style={{ marginBottom: "30px", marginLeft: "10px" }}>
                    <div id="box">
                        {cache.map((product: Product) => (
                            is_authenticated ?
                            <div>
                                <ProductCard key={product.id.toString()}
                                    id={product.id}
                                    full_name={product.full_name}
                                    image={product.image}
                                />
                                <button onClick={() => {addToCart(product.id)}} className="main-add-button">Добавить в команду</button>
                            </div> :
                            <ProductCard key={product.id.toString()}
                                id={product.id}
                                full_name={product.full_name}
                                image={product.image}
                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
        }</>
    )
}

export default ProductListPage;