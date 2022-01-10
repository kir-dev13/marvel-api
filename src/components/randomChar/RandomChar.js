import { Component, useState, useEffect } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
// import thor from "../../resources/img/thor.jpeg";
import mjolnir from "../../resources/img/mjolnir.png";

import "./randomChar.scss";

const RandomChar = () => {
    // state = {
    //     char: {},
    //     loading: true,
    //     error: false,
    // };
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    // componentDidMount = () => {
    //     this.updateRandomChar();
    // };
    useEffect(() => {
        updateRandomChar();
    }, []);

    const onCharLoaded = (char) => {
        // this.setState({ char, loading: false });
        setChar(char);
        setLoading(false);
    };

    const updateRandomChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelService
            .getCharacter(id)
            .then((r) => {
                onCharLoaded(r);
            })
            .catch((e) => {
                console.error(e);
                onError();
            });
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const onUpdate = () => {
        // this.setState({ loading: true, error: false });
        setLoading(true);
        setError(false);
        updateRandomChar();
    };

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {spinner}
            {errorMessage}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main">
                    <div className="inner" onClick={onUpdate}>
                        try it
                    </div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { thumbnail, name, description, homepage, wiki, imgStyle } = char;

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={{ objectFit: `${imgStyle}` }}
                // style={{ objectFit: `contain` }}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
