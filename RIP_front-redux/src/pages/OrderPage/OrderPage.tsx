import { FC, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { useSsid } from '../../hooks/useSsid';
import ProductCardWithCount, { ProductCardData } from "../../components/ProductCardWithCount/ProductCardWithCount";
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Loader from '../../components/Loader/Loader.tsx';
import { useDispatch } from 'react-redux';
import { cleanButton } from "../../store/buttonSlice.ts";
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
    moder_id: number,
    team_name: string,
    positions: Position[]
}

const OrderPage: FC = () => {
    const [ teamName, setTeamName ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean> (true)
    const navigate = useNavigate()
    const [Message, setErrorMessage] = useState('')
    const [showPopup, setShowPopup] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()
    const { session_id } = useSsid()
    const [ data, setData ] = useState<Response> ()
    const resetButton = () => {
        dispatch(cleanButton())
    }
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
            setTeamName(response.data.team_name)
        } catch (error) {
            console.log(error)
            navigate('/products')
            resetButton()
        }
        
    }

    useEffect(() => {
        if (showPopup) {
            const timeout = window.setTimeout(() => {
                // Начинаем процесс плавного исчезновения
                setShowPopup(false);
            }, 5000); // Таймер задан на 5 секунд

            return () => {
                window.clearTimeout(timeout);
            };
        }
    }, [showPopup]);

    const saveTeamName = async () => {
        try {
            await axios(`http://localhost:8000/request/${id}/tname/`, {
                method: "PUT",
                data: { 
                    team_name: teamName 
                },
                headers: { 
                    'authorization': session_id 
                }
            })
            setErrorMessage('Название команды успешно задано!')
            setShowPopup(true);
        } catch (error: any) {
            if (error.response.status === 400) {
                setErrorMessage('Введите название команды!')
                setShowPopup(true) // Показываем всплывающее окно
            }
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
                },
                data:{
                    "team_name" : teamName
                },
            })
            resetButton()
            navigate('/orders')
        } catch (error) {
            console.log(error)
            setErrorMessage('Введите название команды!')
            setShowPopup(true);
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
            resetButton()
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
            {showPopup && <div className="popup-message">{Message}</div>}
            <Row>
                {data && data.status == 'I' ? <Breadcrumbs pages={[ { link: `/orders`, title: `мои заявки` }, { link: `/orders/${id}`, title: `команда` } ]} /> :
                data && <Breadcrumbs pages={[ { link: `/orders`, title: `мои заявки` }, { link: `/orders/${id}`, title: `Заявка №${data.id} от ${data.send?.slice(0, 10)}` } ]} /> }
            </Row>
            <Container id="cart-page" style={{ marginLeft: "30px" }}>
                <Row style={{ display: "flex" }}>
                    <Col style={{ width: "60%" }}>
                        {data && data.status == 'I' && <h1 className="cart-main-text">Вы добавили:</h1>}
                        {data && data.status != 'I' && <h1 className="cart-main-text" style={{ color: `${getStatusColor(getTextStatus(data.status))}` }}>{`Заявка №${data.id} от ${data.send?.slice(0, 10)}: ${getTextStatus(data.status)}`}</h1>}
                    </Col>
                    {data && data.status == 'I' && <Col style={{ display: "flex", marginTop: "22px" }}>
                        <button className="send-button" onClick={sendCart}>Отправить заявку</button>
                        <button className="delete-button" onClick={deleteCart}>Удалить заявку</button>
                    </Col>}
                </Row>
                <Row style = {{ display: "flex"}}>
                    {data && data.status == 'I' ?
                        <>
                        <Col style={{ marginTop: "10px" }} md={6}>
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="Введите название команды"
                                className="team-input" />
                        </Col>
                        <Col style={{ marginLeft: "10px", marginTop: "10px", marginRight: "250px" }} md={6}>
                            <button onClick={saveTeamName} className="save-btn">Сохранить</button>
                        </Col>
                        </>
                    :
                    <>
                        <Col style = {{marginTop: "-10px", marginBottom: "-20px"}} className="cart-main-text">
                            Название команды: {teamName}
                        </Col>
                    </>
                    }
                </Row>
                <Row style={{ display: "flex", flexWrap: "wrap", height: "max-content", position: "relative", top: "-10px" }}>
                    {data && data.status == 'I' ? data.positions.map((pos: Position)  => {
                        const product = pos.participant_data
                        return (
                            <div>
                                <button style = {{marginLeft: "-40px"}} className="remove-button" onClick={() => {deleteFromCart(product.id)}}>Убрать из команды</button>
                                <ProductCardWithCount key={product.id} id={product.id} full_name={product.full_name} image={product.image} is_capitan={pos.is_capitan} buttonStatus = {true} getData={getData}/>
                            </div>
                        )}
                    ) : data && data.positions.map((pos: Position)  => {
                        const product = pos.participant_data
                        return (
                            <ProductCardWithCount key={product.id} id={product.id} full_name={product.full_name} image={product.image} is_capitan={pos.is_capitan} buttonStatus = {false} getData={getData}/>
                        )}
                    )}
                </Row>
            </Container>
        </Container>
        }</>
    )
}

export default OrderPage