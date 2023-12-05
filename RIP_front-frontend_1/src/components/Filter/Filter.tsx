import { FC } from 'react'
import { useState } from 'react';
import './Filter.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface Prices {
    priceMin: Number,
    priceMax: Number,
    priceMinAbsolute: Number,
    priceMaxAbsolute: Number
}

interface FilterData {
    prices: Prices,
    title: string
}

export const Filter: FC<FilterData> = ({ prices, title }) => {
    const [inputPriceMin, setInputPriceMin] = useState(prices.priceMin.toString());
    const [inputPriceMax, setInputPriceMax] = useState(prices.priceMax.toString());
    const [inputTitle, setInputTitle] = useState(title);

    return (
        <Container id="filter">
            <Row><h3 className="filter-title">Фильтр</h3></Row>
            <Row><h3 className="filter-subtitle">Подбор по параметрам</h3></Row>
            <form action="" method="get" id="filter-form">
                
                <Container style={{ transform: "translateY(-30%)", paddingLeft: "20px", borderBottom: "solid 1px #9e9b9b" }}>
                    <Row><h4 className="filter-text">Розничная цена</h4></Row>
                    <Row style={{ display: "flex" }}>
                        <Col><h4 className="filter-text up">от</h4></Col>
                        <Col>
                            { prices.priceMin == prices.priceMinAbsolute ?
                            <input className="filter-input" name="price_min" type="text" size={10} placeholder={prices.priceMin.toString()} /> :
                            <input className="filter-input" name="price_min" type="text" size={10} value={inputPriceMin} onChange={(e) => setInputPriceMin(e.target.value)} />
                            }
                        </Col>
                        <Col><h4 className="filter-text up">до</h4></Col>
                        <Col>
                            { prices.priceMax == prices.priceMaxAbsolute ?
                            <input className="filter-input" name="price_max" type="text" size={10} placeholder={prices.priceMax.toString()} /> :
                            <input className="filter-input" name="price_max" type="text" size={10} value={inputPriceMax} onChange={(e) => setInputPriceMax(e.target.value)} />
                            }
                        </Col>
                    </Row>
                </Container>

                <Container style={{ transform: "translateY(-40%)", paddingBottom: "20px", paddingLeft: "20px", borderBottom: "solid 1px #9e9b9b" }}>
                    <Row><h4 className="filter-text">Наименование</h4></Row>
                    <Row style={{ display: "flex", transform: "translateY(-20%)" }}>
                        <input className="filter-input" name="title" type="text" size={30} placeholder="Введите название" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
                    </Row>
                </Container>

                <Row><input className="filter-submit" type="submit" value="применить" /></Row>
            </form>
        </Container>
    )
}