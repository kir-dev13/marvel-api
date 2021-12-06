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
        chars: [],
        loading: true,
        error: false,
    };

    componentDidMount = () => {
        this.marvelService
            .getAllCharacters()
            .then((res) => {
                this.updateChars(res);
            })
            .catch(this.onError);
    };

    updateChars = (chars) => {
        this.setState({ chars, loading: false });
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
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

// const CharCard = (props) => {
//     const { thumbnail, name, imgStyle, id } = props;
//     console.log(props.onCharSelected);
//     return (
//         <li
//             className="char__item"
//             onClick={() => {
//                 console.log(props.onCharSelected);
//                 props.onCharSelected(id);
//             }}
//         >
//             <img
//                 src={thumbnail}
//                 style={{ objectFit: `${imgStyle}` }}
//                 alt="abyss"
//             />
//             <div className="char__name">{name}</div>
//         </li>
//     );
// };

// const View = (props) => {
//     const { chars } = props;
//     const charCards = chars.map((item) => {
//         const { id, ...itemProps } = item;
//         return (
//             <CharCard
//                 key={id}
//                 id={id}
//                 onCharSelected={props.onCharSelected}
//                 {...itemProps}
//             />
//         );
//     });
//     return (
//         <div className="char__list">
//             <ul className="char__grid">{charCards}</ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     );
// };

export default CharList;
