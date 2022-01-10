import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {
    // state = {
    //     char: null,
    //     loading: false,
    //     error: false,
    // };
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    // componentDidMount() {
    //     this.updateChar();
    // }

    // async componentDidUpdate(prevProps) {
    //     if (this.props.charId !== prevProps.charId) {
    //         await this.updateChar();
    //     }
    // }
    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        onCharLoading();
        marvelService
            .getCharacter(charId)

            .then((r) => {
                onCharLoaded(r);
            })
            .catch((r) => onError(r));
    };

    const onCharLoaded = (char) => {
        // setState({ char, loading: false });
        setChar(char);
        setLoading(false);
    };

    const onCharLoading = () => {
        // setState({ loading: true, error: false });
        setLoading(true);
        setError(false);
    };

    const onError = (e, r) => {
        console.log(e);
        console.log(r);
        // setState({ loading: false, error: true });
        setLoading(false);
        setError(true);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? (
        <ErrorMessage style={{ height: "300px" }} />
    ) : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}

            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, imgStyle, comics } =
        char;
    return (
        <>
            <div className="char__basics">
                <img
                    src={thumbnail}
                    alt={name}
                    style={{ objectFit: `${imgStyle}` }}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.map((item, i) => {
                    return (
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CharInfo;
