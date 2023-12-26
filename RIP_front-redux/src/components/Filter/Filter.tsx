import { FC } from "react";

import { Container, Row } from "react-bootstrap";
import "./Filter.css";
import { useProductFilter } from "../../hooks/useProductFilter";


interface FilterData {
    send: () => any,
}

const Filter: FC<FilterData> = ({ send }) => {
    const { searchValue, setSearchValue} = useProductFilter()

    return (
        <Container id="filter">
            <Row><h3 className="filter-title">Фильтр</h3></Row>
            <form action="" method="get" id="filter-form">   
                <Container style={{ transform: "translateY(-40%)", paddingBottom: "20px", paddingLeft: "20px", borderBottom: "solid 1px #9e9b9b" }}>
                    <Row><h4 className="filter-text">ФИО</h4></Row>
                    <Row style={{ display: "flex", transform: "translateY(-20%)" }}>
                        <input className="filter-input"
                            type="text"
                            autoComplete="off"
                            size={30}
                            placeholder="введите фио участника"
                            name="title"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </Row>
                </Container>
                <Row><input className="filter-submit" type="button" value="применить" onClick={send}/></Row>
            </form>
        </Container>
    )
}

export default Filter;