import { FC } from 'react'
import './Breadcrumbs.css';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
    link: string,
    title: string
}

const Breadcrumbs: FC<{ pages: BreadcrumbsProps[] }> = ({ pages }) =>  (
    <Container id="breadcrumbs">
        <Row>
            <Link to = '/' style={{ textDecoration: "None", color: "black"}}>🏠 главная</Link>
            {pages && pages.map((page, index) => (
                <Link to = { page.link } key={index} style={{ textDecoration: "None", color: "black" }}>{ ` >>> ${page.title}` }</Link>
            ))}
        </Row>
    </Container>
)

export default Breadcrumbs