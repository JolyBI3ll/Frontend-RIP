import { FC } from 'react';
import { Card } from 'react-bootstrap';

import './ProductCard.css';


export interface ProductCardData {
    id: number,
    full_name: string,
    image: string,
}

const ProductCard: FC<ProductCardData> = ({ id, full_name, image }) => (
    <Card className="card">
        <div className="cardImageWrap"><a href={"/products/" + id.toString()}><Card.Img className="cardImage" src={image} height={100} width={100} /></a></div>
        <div className="cardTitleWrap"><a href={"/products/" + id.toString()}><Card.Title className="cardTitle">{full_name}</Card.Title></a></div>
    </Card>
)

export default ProductCard