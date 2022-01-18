import "./banner.sass";
import avengers from "../../../resources/img/Avengers.png";
import logo from "../../../resources/img/Avengers_logo.png";

const Banner = () => {
    return (
        <div className="banner">
            <img src={avengers} alt="" />
            <h2>New comics every week! Stay tuned!</h2>
            <img src={logo} alt="" />
        </div>
    );
};

export default Banner;
