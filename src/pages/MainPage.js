import { useState } from "react";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

import decoration from "../resources/img/vision.png";

const MainPage = (props) => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    };

    return (
        <>
            <RandomChar />
            <div className="char__content">
                <CharList
                    charsLoaded={props.charsLoaded}
                    updateCharsLoaded={props.updateCharsLoaded}
                    onCharSelected={onCharSelected}
                    updateOffsetGlobal={props.updateOffsetGlobal}
                    offset={props.offset}
                />
                <ErrorBoundary>
                    <CharInfo charId={selectedChar} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;
