import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"

import { Container, Row, Col } from "react-bootstrap"
import "./RegisterPage.css"


const RegisterPage: FC = () => {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [showPopup, setShowPopup] = useState(false)
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

    const handleRegister = async (e: any) => {
        e.preventDefault()
        setErrorMessage('')
        const formData = new FormData(e.target as HTMLFormElement)
        
        try {
            const response = await register(formData)
            if (response.status === 200) {
                navigate("/login")
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                setErrorMessage('Такой пользователь уже существует')
                setShowPopup(true) // Показываем всплывающее окно
            } else {
                setErrorMessage('Произошла ошибка при регистрации')
                setShowPopup(true) // Показываем всплывающее окно
            }
        }
    }

    return (
        <Container>
            {showPopup && <div className="popup-message">{errorMessage}</div>}
            <Row>
                {<Breadcrumbs pages={[ { link: `/register`, title: "регистрация" } ]} />}
            </Row>
            <Row>
                <Container style={{ marginLeft: "30px", marginTop: "30px" }}>
                    <Row style={{ display: "flex" }}>
                        <h1 style={{ fontSize: "36px", fontWeight: "500" }}>Регистрация</h1>
                        <a href="/login" className="form-link"><h3>Вход в аккаунт</h3></a>
                    </Row>
                    <form onSubmit={ handleRegister } id="login-form" style={{ marginTop: "30px" }}>
                        <Row>
                            <Col className="left-col">
                                <h3>Имя пользователя</h3>
                            </Col>
                            <Col className="right-col">
                                <input type="text" className="input-login" name="username" placeholder="Введите имя пользователя" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="left-col">
                                <h3>Пароль</h3>
                            </Col>
                            <Col className="right-col">
                                <input type="password" className="input-password" name="password" placeholder="Введите пароль" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="left-col"></Col>
                            <Col className="right-col">
                                <button id="register-button" className="EntButton" type="submit">Зарегистироваться!</button>
                            </Col>
                        </Row>
                    </form>
                </Container>
            </Row>
        </Container>
    )
}

export default RegisterPage;