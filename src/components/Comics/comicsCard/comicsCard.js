import "./comicsCard.sass";
import { Link } from "react-router-dom";

const ComicsCard = (props) => {
    const {
        imgSrc = "",
        title = "нет данных",
        price = "нет данных",
        // details = "",
        id,
    } = props;
    console.log("card");

    return (
        <Link
            to={`/comics/${id}`}
            // href={details}
            // target="_blank"
            className="card"
        >
            <img src={imgSrc} alt="" />
            <span>
                <b>{title}</b>
            </span>
            <br />
            <span>{price}</span>
        </Link>
    );
};

export default ComicsCard;
