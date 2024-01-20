import { FC } from 'react';
import { Card } from 'react-bootstrap';
import ImageWrapper from '../ImageWrapper/ImageWrapper';
import { Link } from 'react-router-dom';
import './ProductCard.css';


export interface ProductCardData {
    id: number,
    full_name: string,
    image: string,
}

const ProductCard: FC<ProductCardData> = ({ id, full_name, image }) => (
    <Card className="card">
        <div className="cardImageWrap"><Link to={"/products/" + id.toString()}><ImageWrapper className="cardImage" src={image} based="/default.jpg" /></Link></div>
        <div className="cardTitleWrap"><Link to={"/products/" + id.toString()}><Card.Title className="cardTitle">{full_name}</Card.Title></Link></div>
    </Card>
)

export default ProductCard