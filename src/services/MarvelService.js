import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    // _apiKey = "apikey=3c313190bbec7031c005aebc1502970";
    const _apiKey = "apikey=3c313190bbec7031c005aebc15029707";
    const _baseOffset = 210;
    // getResources = async (url) => {
    //     let res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();
    // };

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
        );

        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return await _transformCharacter(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        let imgStyle = "cover";
        if (!char.description) {
            char.description = "данных нет";
        }
        if (
            char.thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
            char.thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
        ) {
            imgStyle = "contain";
        }
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            imgStyle: imgStyle,
            comics: char.comics.items,
        };
    };

    return { loading, error, getAllCharacters, getCharacter, clearError };
};

export default useMarvelService;
