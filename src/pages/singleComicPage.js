import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../services/MarvelService";
import Spinner from "../components/spinner/spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import AppBanner from "../components/appBanner/AppBanner";

import "./singleComicPage.scss";

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
        // getComic(comicId).then((data) => logger(data));
    }, [comicId]);

    // const logger = (data) => {
    //     console.log(data);
    // };

    const updateComic = () => {
        clearError();
        getComic(comicId).then(onComicLoaded);
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? (
        <View comic={comic} />
    ) : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ comic }) => {
    const {
        title,
        description,
        pageCount,
        thumbnail,
        language = "unknown",
        price,
    } = comic;

    return (
        <div className="single-comic">
            <a href={comic.urls[0].url} target="_blank">
                <img
                    src={thumbnail.path + "." + thumbnail.extension}
                    alt={title}
                    className="single-comic__img"
                />
            </a>

            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
