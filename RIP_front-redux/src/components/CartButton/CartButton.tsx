import { FC } from 'react'
import "./CartButton.css"
import { Link } from 'react-router-dom';

interface Props {
    CurrentID: number
}

const CartButton: FC<Props> = ({ CurrentID }) => {
    return (
        <div style={{ position: 'relative'}}>{
            CurrentID != -1 ?
            <Link className="navbar-button" to ={`/orders/${CurrentID}`}>Команда</Link> :
            <Link to="#" className="disabled-cart-button">Команда</Link>
        }</div>
    )
}

export default CartButton