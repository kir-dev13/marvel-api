import { useEffect, useState, useRef } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
    const { loading, error, getAllCharacters } = useMarvelService();

    const [chars, setChars] = useState([]);
    // const [newChars, setNewChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);

    useEffect(() => getChars(offset, true), []);

    const getChars = (offset, initial = false) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then((newChars) => {
            updateChars(newChars);
        });
    };

    const updateChars = (newChars) => {
        if (newChars.length < 9) {
            setCharsEnded(true);
        }
        setChars((chars) => [...chars, ...newChars]);
        // setNewChars(newChars);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
    };

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach((item) =>
            item.classList.remove("char__item_selected")
        );
        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    };

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={(el) => (itemRefs.current[i] = el)}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img
                        src={item.thumbnail}
                        style={{ objectFit: `${item.imgStyle}` }}
                        alt="abyss"
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        return <ul className="char__grid">{items}</ul>;
    };

    const items = renderItems(chars);
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    // const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {console.log("%cCharList", "color:pink")}
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{ display: charsEnded ? "none" : "block" }}
                onClick={() => getChars(offset)}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default CharList;
