import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { useSsid } from '../../hooks/useSsid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductCardWithCount.css';


export interface ProductCardData {
    id: number,
    full_name: string,
    image: string,
    is_capitan: boolean,
    buttonStatus: boolean,
    getData: Function
}

const ProductCardWithCount: FC<ProductCardData> = ({ id, full_name, image, is_capitan, buttonStatus, getData}) => {
    const { session_id } = useSsid()
    const handleButtonClick = () => {
        const newStatus = !is_capitan;
        changeStatus(newStatus); // Передаем новое значение
    };
      
    const changeStatus = async (new_status: boolean) => {
        try {
            await axios(`http://127.0.0.1:8000/links/`, {
                method: "PUT",
                headers: {
                    'authorization': session_id
                },
                data: {
                    'is_capitan': new_status,
                    'participant': id
                }
            })
            getData()
        } catch (error) {
            console.log("Что-то пошло не так")
        }
    }

    return (
        <Card style = {{marginLeft: "0px", marginRight: "10px"}} className="card">
            <div className="cardImageWrap"><Link to={"/products/" + id.toString()}><Card.Img className="cardImage" src={image} height={100} width={100} /></Link></div>
            <div className="cardTitleWrap"><Link to={"/products/" + id.toString()}><Card.Title className="cardTitle">{full_name}</Card.Title></Link></div>
            {buttonStatus === true &&
            <div style={{ position: "relative", top: "-30px" }}>
                <button className='cap-button' style = {{marginTop: '25px', marginRight: '200px'}} onClick= {handleButtonClick}>Сменить статус капитана</button>
            </div>
            }
            <div style = {{marginTop: '-30px'}}>
                <span>
                    Капитан? - {is_capitan? "Да": "Нет"}
                </span>
            </div>
        </Card>
    )
}

export default ProductCardWithCount