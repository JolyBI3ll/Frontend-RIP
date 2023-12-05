import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./Navbar.css"

const Navbar: FC = () => {
    return (
        <Container style={{ paddingLeft: "30px", width: "200%", backgroundColor: "antiquewhite" }}>
            <Row style={{ display: "flex" }}>
                <Col style={{ width: "70%", margin: "30px" }}>
                    example text
                </Col>
                <Col style={{ width: "30%", margin: "30px" }}>
                    example text 2
                </Col>
            </Row>
        </Container>
    )
}

export default Navbar