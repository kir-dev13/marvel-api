import { useEffect, useState } from "react";
import useMarvelService from "../../../services/MarvelService";

import ComicsCard from "../comicsCard/comicsCard";
import Spinner from "../../spinner/spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";

import "./comicsDashboard.sass";

const ComicsDashboard = () => {
    const { loading, error, getComics } = useMarvelService();
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemloading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicssEnded, setComicssEnded] = useState(false);

    //!! закэшировать запрос!
    //!! Поймать ошибку и вывести статус
    //!! сделать ховер
    //!! максимально осознать useHttp

    useEffect(() => {
        updateComics();
    }, []);

    const updateComics = () => {
        //второй параметр по умолчанию false. При первой загрузке стоит true
        getComics(offset, true).then((data) => {
            console.log(data);
            setComics([...comics, ...data]);
            setOffset((offset) => offset + 8);
        });
    };

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    console.log("Comics");

    return (
        <>
            <ul className="comicsDashboard">
                {comics.map((comic) => {
                    return (
                        <ComicsCard
                            key={comic.id}
                            id={comic.id}
                            imgSrc={`${comic.images[0]?.path}.${comic.images[0]?.extension}`}
                            title={comic.title}
                            price={comic.prices[0].price}
                            // details={comic.urls[0].url}
                        />
                    );
                })}
            </ul>
            {spinner}
            {errorMessage}
            <button
                onClick={updateComics}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </>
    );
};

export default ComicsDashboard;
