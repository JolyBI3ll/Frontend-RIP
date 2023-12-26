import { FC, useEffect, useState } from "react"
import { Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth';
import { useSsid } from '../../hooks/useSsid';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import OrderTable from '../../components/OrderTable/OrderTable';
import FilterOrderStatus from '../../components/FilterOrderStatus/FilterOrderStatus';
import Loader from '../../components/Loader/Loader.tsx';

import axios from 'axios';
import DateFilter from "../../components/DateFilter/DateFilter.tsx";


type Filter = {
    P: boolean;
    A: boolean;
    W: boolean;
}

interface Response {
    id: number,
    created: string,
    send: string | undefined,
    closed: string | undefined,
    eventstatus: string,
    status: "I" | "P" | "D" | "A" | "W",
    user_id: number,
    moder_id: number
}

const OrderListPage: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)
    const { session_id } = useSsid()
    const { is_authenticated } = useAuth()
    const [ response, setResponse ] = useState<Response[]> ()

    const [filter, setFilter] = useState<Filter> ({
        P: true,
        A: true,
        W: true,
    });

    const [ startDate, setStartDate ] = useState<Date | undefined> ()
    const [ endDate, setEndDate ] = useState<Date | undefined> ()
    
    const handleFilterChange = (newFilter: Filter) => {
        setFilter(newFilter);
    };

    const getFilterStatusParams = () => {
        let result = ''
        if (filter.P) {
            result += 'P'
        }
        if (filter.A) {
            result += 'A'
        }
        if (filter.W) {
            result += 'W'
        }
        return result
    }

    const getOrders = async () => {
        try {
            console.log(`start_date = ${startDate}`)
            console.log(`end_date = ${endDate}`)
            const { data } = await axios(`http://127.0.0.1:8000/request/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    'status': getFilterStatusParams(),
                    'start_date': startDate,
                    'end_date': endDate,
                }
            })
            setResponse(data)
        } catch {
            console.log("Что-то пошло не так")
        }
    }

    useEffect(() => {
        getOrders().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [filter])

    if (!is_authenticated && !loading) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Войдите в аккаунт, чтобы посмотреть список заявок</h1>
            </Container>
        )
    }

    if (response && !loading && response.length == 0) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Вы не сформировали ни одну заявку</h1>
            </Container>
        )
    }

    const getTextStatus = (status: string) => {
        if (status === 'P') {
            return 'отправлен'
        } else if (status === 'A') {
            return 'принят'
        } else if (status == 'W') {
            return 'отклонён'
        }
        return ''
    }

    const getTextEventStatus = (status: string) => {
        if (status === 'W') {
            return 'победа'
        } else if (status === 'F') {
            return 'поражение'
        } else if (status == 'N') {
            return 'не сыграно'
        }
        return ''
    }

    const getTransformedData = () => {
        let result: any = []
        response?.map((request) => {
            if (request.status != 'I') {
                result.push({
                    pk: request.id,
                    send: `${request.send?.slice(0, 10)} ${request.send?.slice(11, 19)}`,
                    status: getTextStatus(request.status),
                    eventstatus: getTextEventStatus(request.eventstatus)
                })
            }
        })
        return result
    }

    return (
        <> {loading ? <Loader /> :
        <Container>
            <Row>
                <Breadcrumbs pages={[ { link: `/orders`, title: `мои заявки` } ]} />
            </Row>
            <Row style={{ display: "flex" }}>
                <Col style={{ width: "35%" }}>
                    <h1 className="cart-main-text" style={{ marginTop: "30px", marginLeft: "30px" }}>Список ваших заявок: </h1>
                </Col>
                <Col style={{ width: "25%" }}></Col>
                <Col style={{ width: "40%" }}>
                    <FilterOrderStatus state={filter} handleFilterChange={handleFilterChange} />
                </Col>
            </Row>
            <Row>
                <DateFilter
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    send={getOrders}
                />
            </Row>
            <Row>
                <OrderTable requests={getTransformedData()}/>
            </Row>
        </Container>
        }</>
    )
}

export default OrderListPage