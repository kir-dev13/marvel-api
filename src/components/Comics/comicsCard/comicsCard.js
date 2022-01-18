import "./comicsCard.sass";

const ComicsCard = (props) => {
    const { imgSrc = "", name = "название", price = "член" } = props;
    return (
        <div className="card">
            <img src={imgSrc} alt="" />
            <span>
                <b>{name}</b>
            </span>
            <br />
            <span>{price}</span>
        </div>
    );
};

export default ComicsCard;
