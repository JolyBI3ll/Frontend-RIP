import { FC } from 'react'
import { Container, Row} from 'react-bootstrap'
import "./Navbar.css"

const Navbar: FC = () => {
    return (
        <Container style={{ paddingLeft: "30px", width: "100%", backgroundColor: "rgb(255, 234, 0)" }}>
            <Row style={{ display: "flex" }}>
            </Row>
        </Container>
    )
}

export default Navbar