import { FC } from 'react'
import './HeadTitle.css'
import { getBase } from '../../../path_config.ts';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const HeadTitle: FC = () => (
    <Container id="head">
        <Row id="head-title-row"><a href={`${getBase()}/`} id="head-title">SuperView</a></Row>
        <Row id="head-subtitle-row"><a href={`${getBase()}/`} id="head-subtitle">Интернет-магазин оптики</a></Row>
    </Container>
)

export default HeadTitle