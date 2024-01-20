import { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import HeadTitle from '../HeadTitle/HeadTitle.tsx';
import CartButton from '../../components/CartButton/CartButton.tsx';
import { Container, Row, Col } from 'react-bootstrap'
import "./Navbar.css"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
                <Link className="navbar-button" to="/">Участники</Link>
            </Col>
            <Col style={{ width: "18%" }}>
                <Link className="navbar-button" to="/register">Регистрация</Link>
            </Col>
            <Col style={{ width: "10%" }}>
                <Link className="navbar-button" to="/login">Вход</Link>
            </Col>
        </Row>
    )

    const getUserNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px", justifyContent: "space-between" }}>
            <Col style={{ width: "50%" }}></Col>
            <Col style={{ width: "150px" }}>
                <Link className="navbar-button" to="/">Участники</Link>
            </Col>
            <Col style={{ width: "150px", marginLeft: "30px" }}>
                {is_authenticated && <CartButton CurrentID={ CurrentID } />}
            </Col>
            <Col style={{ width: "150px" }}>
                <Link className="navbar-button" to="/orders">Заявки</Link>
            </Col>
            <Col style={{ width: "250px" }}>
                <Link className="navbar-button" to="#" onClick={ handleLogout }>{`${username}: выход`}</Link>
            </Col>
        </Row>
    )

    const getModerNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px", justifyContent: "space-between" }}>
            <Col style={{ width: "33%" }}></Col>
            <Col style={{ width: "12%" }}>
                <Link className="navbar-button" to="/">Участники</Link>
            </Col>
            <Col style={{ width: "23%" }}>
                <Link className="navbar-button" to="/product-table">Таблица участников</Link>
            </Col>
            <Col style={{ width: "12%" }}>
                <Link className="navbar-button" to="/orders">Заявки</Link>
            </Col>
            <Col style={{ width: "20%" }}>
                <Link className="navbar-button" to="#" onClick={ handleLogout }>{`${username}: выход`}</Link>
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