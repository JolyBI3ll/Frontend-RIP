import { FC } from 'react'
import "./MainPage.css"

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MainPage: FC = () => {
    return (
        <Container id="main-page">
            <Row style={{ display: "flex" }}>
                <Col>
                    <a href="/products/?type=sunglasses"><div className="image-wrap"><img src="src/images/sunglasses.jpg" alt="картинка" /></div></a>
                    <h2 className="main-page-text">Солнцезащитные очки</h2>
                </Col>
                <Col>
                    <a href="/products/?type=frames"><div className="image-wrap"><img src="src/images/frames.jpg" alt="картинка" /></div></a>
                    <h2 className="main-page-text">Оправы для очков</h2>
                </Col>
                <Col>
                    <a href="/products/?type=lenses"><div className="image-wrap"><img src="src/images/lenses.jpg" alt="картинка" /></div></a>
                    <h2 className="main-page-text">Контактные линзы</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default MainPage;