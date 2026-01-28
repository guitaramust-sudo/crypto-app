import Typography from "antd/es/typography/Typography"

const CoinInfo = ({coin}) => {
    return (
        <section className="modal">
        <img src= {coin.icon} alt={coin.name} width='40' height='40'/>
        <Typography.Title className="modal__info" level={2}>({coin.symbol}) {coin.name}</Typography.Title>
        </section>
    )
}

export default CoinInfo
