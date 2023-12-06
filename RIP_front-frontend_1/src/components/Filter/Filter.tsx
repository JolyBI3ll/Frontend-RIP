import { FC } from 'react'
import { useState } from 'react';
import './Filter.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface FilterData {
    title: string
}

export const Filter: FC<FilterData> = ({title}) => {
    const [inputTitle, setInputTitle] = useState(title);
    
    return (
        <Container id="filter">
            <Row><h3 className="filter-title">Фильтр</h3></Row>
            <form action="" method="get" id="filter-form">

                <Container style={{ transform: "translateY(-40%)", paddingBottom: "20px", paddingLeft: "20px", borderBottom: "solid 1px #9e9b9b" }}>
                    <Row><h4 className="filter-text">ФИО участника</h4></Row>
                    <Row style={{ display: "flex", transform: "translateY(-20%)" }}>
                        <input className="filter-input" name="title" type="text" size={30} placeholder="Введите ФИО" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
                    </Row>
                </Container>

                <Row><input className="filter-submit" type="submit" value="применить" /></Row>
            </form>
        </Container>
    )
}