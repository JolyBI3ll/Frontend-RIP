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
    is_capitan: boolean,
    Participant: number,
    participant_data: ProductCardData
}

interface Response {
    id: number,
    created: string,
    send: string | undefined,
    closed: string | undefined,
    eventstatus: string,
    status: "I" | "P" | "D" | "A" | "W",
    user_id: number,
    moder_id: number
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
            const response = await axios(`http://localhost:8000/request/${id}/`, {
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
            await axios(`http://localhost:8000/request/`, {
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
            await axios(`http://localhost:8000/request/`, {
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

    const deleteFromCart = async (participant_id: number) => {
        try {
            const response = await axios(`http://localhost:8000/links/`, {
                method: "DELETE",
                data: {
                    'participant': participant_id
                },
                headers: {
                    'authorization': session_id
                }
            })
            getData()
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
                {data && data.status == 'I' ? <Breadcrumbs pages={[ { link: `/orders`, title: `мои заявки` }, { link: `/orders/${id}`, title: `команда` } ]} /> :
                data && <Breadcrumbs pages={[ { link: `/orders`, title: `мои заказы` }, { link: `/orders/${id}`, title: `Заказ №${data.id} от ${data.send?.slice(0, 10)}` } ]} /> }
            </Row>
            <Container id="cart-page" style={{ marginLeft: "30px" }}>
                <Row style={{ display: "flex" }}>
                    <Col style={{ width: "60%" }}>
                        {data && data.status == 'I' && <h1 className="cart-main-text">Вы добавили:</h1>}
                        {data && data.status != 'I' && <h1 className="cart-main-text" style={{ color: `${getStatusColor(getTextStatus(data.status))}` }}>{`Заказ №${data.id} от ${data.send?.slice(0, 10)}: ${getTextStatus(data.status)}`}</h1>}
                    </Col>
                    {data && data.status == 'I' && <Col style={{ display: "flex", marginTop: "22px" }}>
                        <button className="send-button" onClick={sendCart}>Отправить заявку</button>
                        <button className="delete-button" onClick={deleteCart}>Удалить заявку</button>
                    </Col>}
                </Row>
                <Row style={{ display: "flex", flexWrap: "wrap", height: "max-content", position: "relative", top: "-10px" }}>
                    {data && data.status == 'I' ? data.positions.map((pos: Position)  => {
                        const product = pos.participant_data
                        return (
                            <div>
                                <button className="remove-button" onClick={() => {deleteFromCart(product.id)}}>Убрать из команды</button>
                                <ProductCardWithCount key={product.id} id={product.id} full_name={product.full_name} image={product.image} is_capitan={pos.is_capitan} />
                            </div>
                        )}
                    ) : data && data.positions.map((pos: Position)  => {
                        const product = pos.participant_data
                        return (
                            <ProductCardWithCount key={product.id} id={product.id} full_name={product.full_name} image={product.image} is_capitan={pos.is_capitan} />
                        )}
                    )}
                </Row>
            </Container>
        </Container>
        }</>
    )
}

export default OrderPage