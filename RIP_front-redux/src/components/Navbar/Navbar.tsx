import { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import HeadTitle from '../HeadTitle/HeadTitle.tsx';
import CartButton from '../../components/CartButton/CartButton.tsx';
import { Container, Row, Col } from 'react-bootstrap'
import "./Navbar.css"
import { useSelector } from 'react-redux';

const Navbar: FC = () => {
    const { is_authenticated, username, is_moderator, logout } = useAuth()
    const navigate = useNavigate()
    //@ts-ignore
    const CurrentID = useSelector((state) => state.button.current_id);
    const handleLogout = async () => {
        await logout()
        navigate("/products")
    }

    const getGuestNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px", justifyContent: "space-between" }}>
            <Col style={{ width: "60%" }}></Col>
            <Col style={{ width: "12%" }}>
                <a className="navbar-button" href="/">Участники</a>
            </Col>
            <Col style={{ width: "18%" }}>
                <a className="navbar-button" href="/register">Регистрация</a>
            </Col>
            <Col style={{ width: "10%" }}>
                <a className="navbar-button" href="/login">Вход</a>
            </Col>
        </Row>
    )

    const getUserNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px", justifyContent: "space-between" }}>
            <Col style={{ width: "56%" }}></Col>
            <Col style={{ width: "12%" }}>
                <a className="navbar-button" href="/">Участники</a>
            </Col>
            <Col style={{ width: "20%", marginLeft: "30px" }}>
                {is_authenticated && <CartButton CurrentID={ CurrentID } />}
            </Col>
            <Col style={{ width: "12%" }}>
                <a className="navbar-button" href="/orders">Заявки</a>
            </Col>
            <Col style={{ width: "20%" }}>
                <a className="navbar-button" href="#" onClick={ handleLogout }>{`${username}: выход`}</a>
            </Col>
        </Row>
    )

    const getModerNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px", justifyContent: "space-between" }}>
            <Col style={{ width: "33%" }}></Col>
            <Col style={{ width: "12%" }}>
                <a className="navbar-button" href="/">Участники</a>
            </Col>
            <Col style={{ width: "23%" }}>
                <a className="navbar-button" href="/product-table">Таблица участников</a>
            </Col>
            <Col style={{ width: "12%" }}>
                <a className="navbar-button" href="/orders">Заявки</a>
            </Col>
            <Col style={{ width: "20%" }}>
                <a className="navbar-button" href="#" onClick={ handleLogout }>{`${username}: выход`}</a>
            </Col>
        </Row>
    )

    const getNavbar = () => {
        if (!is_authenticated) {
            return getGuestNavbar()
        } else if (!is_moderator) {
            return getUserNavbar()
        } else {
            return getModerNavbar()
        }
    }

    return (
        <Row id="header">
            <HeadTitle />
            <Container id="navbar" style={{ paddingLeft: "30px", width: "200%" }}>
                {getNavbar()}
            </Container>
        </Row>
    )
}
export default Navbar