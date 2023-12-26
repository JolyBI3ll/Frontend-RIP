import { FC } from 'react'

interface Props {
    CurrentID: number
}

const CartButton: FC<Props> = ({ CurrentID }) => {
    return (
        <div style={{ position: 'relative', top: '-118px', left: '60%', width: 'max-content' }}>{
            CurrentID != -1 ?
            <a className="navbar-button" href={`/orders/${CurrentID}`}>Команда</a> :
            <a href="#" id="disabled-cart" className="disabled">Команда</a>
        }</div>
    )
}

export default CartButton