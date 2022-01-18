import ComicsCard from "../comicsCard/comicsCard";

import "./comicsDashboard.sass";

const dataArray = [
    { imgSrc: "", name: "жопочлен1", price: "10" },
    { imgSrc: "", name: "жопочлен2", price: "20" },
    { imgSrc: "", name: "жопочлен3", price: "30" },
    { imgSrc: "", name: "жопочлен4", price: "40" },
    { imgSrc: "", name: "жопочлен5", price: "50" },
    { imgSrc: "", name: "жопочлен6", price: "60" },
    { imgSrc: "", name: "жопочлен7", price: "70" },
    { imgSrc: "", name: "жопочлен8", price: "80" },
];

const ComicsDashboard = () => {
    return (
        <>
            <ul className="comicsDashboard">
                {dataArray.map((data) => {
                    return (
                        <ComicsCard
                            imgSrc={data.imgSrc}
                            name={data.name}
                            price={data.price}
                        />
                    );
                })}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </>
    );
};

export default ComicsDashboard;
