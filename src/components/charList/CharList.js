import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
    marvelService = new MarvelService();
    state = {
        chars: [],
        newChars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charsEnded: false,
    };

    componentDidMount = () => {
        this.getChars();
    };

    getChars = (offset) => {
        console.log(offset);
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then((newChars) => {
                this.updateChars(newChars);
            })
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };

    updateChars = (newChars) => {
        if (newChars.length < 9) {
            this.setState({ charsEnded: true });
        }
        this.setState(({ chars, offset }) => {
            return {
                chars: [...chars, ...newChars],
                newChars: newChars,
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
            };
        });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    renderItems(arr) {
        const items = arr.map((item) => {
            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
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
    }

    render() {
        const { newItemLoading, offset, chars, loading, error, charsEnded } =
            this.state;
        const items = this.renderItems(chars);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    disabled={newItemLoading}
                    style={{ display: charsEnded ? "none" : "block" }}
                    onClick={() => this.getChars(offset)}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
