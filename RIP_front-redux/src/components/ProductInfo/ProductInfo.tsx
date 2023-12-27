import { FC } from 'react'
import { useAuth } from "../../hooks/useAuth";
import { useSsid } from '../../hooks/useSsid';
import axios from "axios";
import ImageWrapper from '../ImageWrapper/ImageWrapper';

import './ProductInfo.css'
export interface Param {
    key: string,
    value: string
}

interface Props {
    id: number,
    full_name: string,
    parameters: Param[],
    image: string
}

const ProductInfo: FC<Props> = ({id, full_name, parameters, image }) => {

    const { session_id } = useSsid()
    const { is_authenticated } = useAuth()

    const addToCart = async (participants_id: number) => {
        await axios(`http://localhost:8000/participants/${participants_id}/`, {
            method: "POST",
            headers: {
                'authorization': session_id
            },
        })
    }

    return (
        <div className="product">
            <div className="product-info" key={id.toString()}>
                <h4 className="product-title">{full_name}</h4>
                <div className="product-image-wrap">
                    <ImageWrapper className="product-image" src={image} based="/default.jpg" />
                </div>
                <input type="radio" name="radio" id="product-params" defaultChecked />
                <input type="radio" name="radio" id="product-reviews" />
                <div className="product-bar">
                    <label htmlFor="product-params" className="product-params-text">Описание и характеристики</label>
                </div>
                <table className="product-params">
                    {parameters && parameters.map((param) => (
                        param.value && <tr className="product-param">
                        <td className="property-key">
                            <h4 className="property-key-text">{param.key}</h4>
                            <h4 className="property-key-dots"></h4>
                        </td>
                        <td className="property-value">{param.value}</td>
                    </tr>
                    ))}
                </table>
            </div>
            <div className="product-price-card">
                <div className="product-price-block">
                </div>
                {is_authenticated ? <button className="product-to-cart-green" type="button" onClick={ () => addToCart(id) }>В команду</button> : <button className="product-to-cart-grey" type="button">В команду</button>}
                {!is_authenticated  && <h5 className="help-text">Авторизуйтесь, чтобы добавить в команду</h5>}
            </div>
        </div>
    )
}

export default ProductInfo