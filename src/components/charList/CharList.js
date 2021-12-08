import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
    // constructor(props) {
    //     super(props);
    // }
    marvelService = new MarvelService();
    state = {
        firstCharNumber: 210,
        chars: [],
        // newChars: [],
        loading: false,
        error: false,
    };

    componentDidMount = () => {
        this.getChars();
    };

    getChars = () => {
        this.setState({ loading: true });
        this.marvelService
            .getAllCharacters(this.state.firstCharNumber)
            .then((res) => {
                this.updateChars(res);
            })
            .then(
                this.setState(({ firstCharNumber }) => {
                    return {
                        firstCharNumber: firstCharNumber + 9,
                    };
                })
            )
            .catch(this.onError);
    };

    updateChars = (res) => {
        // console.log(this.state.loading);
        this.setState(({ chars, loading }) => {
            return {
                chars: [...chars, ...res],
                loading: false,
            };
        });
        // console.log("updated!");
        // console.log(this.state.loading);
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
        const { chars, loading, error } = this.state;
        const items = this.renderItems(chars);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner" onClick={this.getChars}>
                        load more
                    </div>
                </button>
            </div>
        );
    }
}

export default CharList;
