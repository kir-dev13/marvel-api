import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, ComicsPage, Page404, SingleComicPage } from "../../pages";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    const [charsLoaded, setCharsloaded] = useState([]);
    const [offset, setOffset] = useState(210);

    const updateCharsLoaded = (chars) => {
        setCharsloaded(chars);
    };

    const updateOffsetGlobal = () => {
        setOffset(offset + 9);
    };

    console.log("charsLoaded: ", charsLoaded);

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <MainPage
                                    charsLoaded={charsLoaded}
                                    updateCharsLoaded={updateCharsLoaded}
                                    updateOffsetGlobal={updateOffsetGlobal}
                                    offset={offset}
                                />
                            }
                        />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route
                            path="/comics/:comicId"
                            element={<SingleComicPage />}
                        />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
