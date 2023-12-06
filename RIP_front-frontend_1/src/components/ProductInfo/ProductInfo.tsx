import { FC } from 'react'
import './ProductInfo.css'

export interface Param {
    key: string,
    value: string
}

interface Props {
    pk: Number,
    title: string,
    parameters: Param[],
    image: string
}

// "data:image/jpeg;base64,"+
const ProductInfo: FC<Props> = ({pk, title, parameters, image}) => (
    <div className="product">
        <div className="product-info" key={pk.toString()}>
            <h4 className="product-title">{title}</h4>
            <div className="product-image-wrap">
                <img src={`data:image/jpeg;base64,${image}`} height={300} width={700} alt="картинка" className="product-image" />
            </div>
            <input type="radio" name="radio" id="product-params" defaultChecked />
            <input type="radio" name="radio" id="product-reviews" />
            <div className="product-bar">
                <label htmlFor="product-params" className="product-params-text">Описание</label>
            </div>
            <table className="product-params">
                {parameters && parameters.map((param) => (
                    param.value && <tr className="product-param">
                    {param.key === "Биография" && 
                            (  
                                <td className="aboba">
                                    <h4 className="property-key-text">{param.key}:</h4>
                                    <h4 className="property-key-last"></h4>
                                </td>
                            )
                    }
                    {param.key !== "Биография" && 
                            (  
                                <td className="property-key">
                                    <h4 className="property-key-text">{param.key}</h4>
                                    <h4 className="property-key-dots"></h4>
                                </td>
                            )
                    }
                    <td className="property-value">{param.value}</td>
                </tr>
                ))}
            </table>
        </div>
        <div className="product-price-card">
            <h4 className="product-status-green">Активен</h4>
            <button className="product-to-cart-green" type="button">Нанять</button>
        </div>
    </div>
)

export default ProductInfo