import { FC } from 'react'
import './HeadTitle.css'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const HeadTitle: FC = () => (
    <Container id="head">
        <Row id="head-title-row"><Link to='/' id="head-title">onGAME</Link></Row>
        <Row id="head-subtitle-row"><Link to='/' id="head-subtitle">Платформа спортивных соревнований</Link></Row>
    </Container>
)

export default HeadTitle