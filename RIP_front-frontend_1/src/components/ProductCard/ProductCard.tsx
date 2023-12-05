import { FC } from 'react'
import { Card } from 'react-bootstrap'
import './ProductCard.css'

interface Props {
    pk: Number,
    title: string,
    image: string,
}

// "data:image/jpeg;base64,"+
const ProductCard: FC<Props> = ({ pk, title, image }) => (
    <Card className="card">
        <div className="cardImageWrap"><a href={"products/" + pk.toString()}><Card.Img className="cardImage" src={image} height={100} width={100} /></a></div>
        <div className="cardTitleWrap"><a href={"products/" + pk.toString()}><Card.Title className="cardTitle">{title}</Card.Title></a></div>
        <h4 className="cardStatusGreen">подробнее</h4>
    </Card>
)

export default ProductCard