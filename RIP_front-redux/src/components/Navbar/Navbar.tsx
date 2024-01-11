import { FC, useEffect, useState} from 'react'
import { useSsid } from "../../hooks/useSsid.ts";
import { useAuth } from '../../hooks/useAuth';
import CartButton from '../../components/CartButton/CartButton.tsx';
import { EmptyLoader } from '../../components/Loader/Loader.tsx';
import HeadTitle from '../HeadTitle/HeadTitle.tsx';
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap'
import "./Navbar.css"
import { useSelector } from 'react-redux';

interface Response {
    RequestId: number
}

const Navbar: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)
    const { is_authenticated, username, auth } = useAuth()
    const { session_id } = useSsid()
    const [ response, setResponse ] = useState<Response> ({
        RequestId: -1
    })
    //@ts-ignore
    const CurrentID = useSelector((state) => state.button.current_id);
    const getFilteredProducts = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/participants/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                signal: AbortSignal.timeout(1000)
            })
            setResponse(data)
        } catch (error) {
            console.log("Возникла ошибка!")
        }
    }

    const getData = async () => {
        await auth()
    }

    useEffect(() => {
        getFilteredProducts().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        getData().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, []);

    return (
        <> {loading ? <EmptyLoader /> :
        <Row id="header">
            <HeadTitle />
            <Container id="navbar" style={{ paddingLeft: "30px", width: "200%" }}>
                <Row id="navbar-row" style={{ display: "flex", marginTop: "47px" }}>
                    {!is_authenticated &&
                        <Col style={{ width: "70%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/">Смотреть участников</a>
                        </Col>
                    }
                    
                    {!is_authenticated &&
                        <Col style={{ width: "15%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/register">Регистрация</a>
                        </Col>
                    }
                    {!is_authenticated &&
                        <Col style={{ width: "15%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/login">Вход</a>
                        </Col>
                    }   
                    {is_authenticated &&
                        <Col style={{ width: "65%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/">Смотреть участников</a>
                        </Col>
                    }
                    {console.log(CurrentID)}
                    {is_authenticated && <CartButton CurrentID={ CurrentID } />}

                    {is_authenticated &&
                        <Col style={{ width: "20%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/orders">Мои заявки</a>
                        </Col>
                    }
                    
                    {is_authenticated && 
                        <Col style={{ width: "15%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/profile" style={{ color: "rgb(255, 69, 106)" }}>{username}</a>
                        </Col>
                    }      
                </Row>
            </Container>
        </Row>
        }</>
    )
}

export default Navbar