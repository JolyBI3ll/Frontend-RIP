import { FC, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { useSsid } from '../../hooks/useSsid';

import ProductCardWithCount, { ProductCardData } from "../../components/ProductCardWithCount/ProductCardWithCount";
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Loader from '../../components/Loader/Loader.tsx';

import axios from 'axios';

import "./OrderPage.css"


interface Position {
    product_cnt: number,
    product: number,
    product_data: ProductCardData
}

interface Response {
    pk: number,
    created: string,
    send: string | undefined,
    closed: string | undefined,
    status: "I" | "P" | "D" | "A" | "W",
    user: number,
    moderator: number,
    positions: Position[]
}

const OrderPage: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)
    const navigate = useNavigate()
    const { id } = useParams()
    const { session_id } = useSsid()
    const [ data, setData ] = useState<Response> ()

    const getData = async () => {
        try {
            const response = await axios(`http://localhost:8080/orders/${id}/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': session_id
                },
            })
            setData(response.data)
        } catch (error) {
            console.log(error)
            navigate('/products')
        }
        
    }

    useEffect(() => {
        getData().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    const sendCart = async () => {
        try {
            await axios(`http://localhost:8080/orders/`, {
                method: "PUT",
                headers: {
                    'authorization': session_id
                }
            })
            navigate('/orders')
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCart = async () => {
        try {
            await axios(`http://localhost:8080/orders/`, {
                method: "DELETE",
                headers: {
                    'authorization': session_id
                }
            })
            navigate('/products')
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFromCart = async (product_id: number) => {
        try {
            const response = await axios(`http://localhost:8080/links/`, {
                method: "DELETE",
                data: {
                    'product': product_id
                },
                headers: {
                    'authorization': session_id
                }
            })
                
            if (response.data == "undefined") {
                navigate('/products')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTextStatus = (status: string) => {
        if (status === 'P') {
            return 'отправлен'
        } else if (status === 'A') {
            return 'принят'
        } else if (status == 'W') {
            return 'отклонён'
        }
        return ''
    }

    const getStatusColor = (status: string) => {
        if (status == 'принят') {
            return "rgb(73, 171, 50)"
        } else if (status == 'отклонён') {
            return "rgb(237, 104, 137)"
        } else if (status == 'отправлен') {
            return "rgb(193, 189, 58)"
        } else {
            return "white"
        }
    }

    return (
        <> {loading ? <Loader /> :
        <Container>
            <Row>
                {data && data.status == 'I' ? <Breadcrumbs pages={[ { link: `/orders`, title: `мои заказы` }, { link: `/orders/${id}`, title: `корзина` } ]} /> :
                data && <Breadcrumbs pages={[ { link: `/orders`, title: `мои заказы` }, { link: `/orders/${id}`, title: `Заказ №${data.pk} от ${data.send?.slice(0, 10)}` } ]} /> }
            </Row>
            <Container id="cart-page" style={{ marginLeft: "30px" }}>
                <Row style={{ display: "flex" }}>
                    <Col style={{ width: "60%" }}>
                        {data && data.status == 'I' && <h1 className="cart-main-text">Вы добавили:</h1>}
                        {data && data.status != 'I' && <h1 className="cart-main-text" style={{ color: `${getStatusColor(getTextStatus(data.status))}` }}>{`Заказ №${data.pk} от ${data.send?.slice(0, 10)}: ${getTextStatus(data.status)}`}</h1>}
                    </Col>
                    {data && data.status == 'I' && <Col style={{ display: "flex", marginTop: "22px" }}>
                        <button className="send-button" onClick={sendCart}>Отправить заказ</button>
                        <button className="delete-button" onClick={deleteCart}>Удалить заказ</button>
                    </Col>}
                </Row>
                <Row style={{ display: "flex", flexWrap: "wrap", height: "max-content", position: "relative", top: "-10px" }}>
                    {data && data.status == 'I' ? data.positions.map((pos: Position)  => {
                        const product = pos.product_data
                        return (
                            <div>
                                <button className="remove-button" onClick={() => {deleteFromCart(product.pk)}}>Убрать из корзины</button>
                                <ProductCardWithCount key={product.pk} pk={product.pk} title={product.title} price={product.price} image={product.image} cnt={product.cnt} product_cnt={pos.product_cnt} can_change_cnt={true} />
                            </div>
                        )}
                    ) : data && data.positions.map((pos: Position)  => {
                        const product = pos.product_data
                        return (
                            <ProductCardWithCount key={product.pk} pk={product.pk} title={product.title} price={product.price} image={product.image} cnt={product.cnt} product_cnt={pos.product_cnt} can_change_cnt={false} />
                        )}
                    )}
                </Row>
            </Container>
        </Container>
        }</>
    )
}

export default OrderPage