import "./comicsCard.sass";

const ComicsCard = (props) => {
    const {
        imgSrc = "",
        title = "нет данных",
        price = "нет данных",
        details = "",
    } = props;
    console.log("card");

    return (
        <a href={details} target="_blank" className="card">
            <img src={imgSrc} alt="" />
            <span>
                <b>{title}</b>
            </span>
            <br />
            <span>{price}</span>
        </a>
    );
};

export default ComicsCard;
