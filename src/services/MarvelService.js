class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    // _apiKey = "apikey=3c313190bbec7031c005aebc1502970";
    _apiKey = "apikey=3c313190bbec7031c005aebc15029707";

    getResources = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        // return await res;
        // let ex = await res.json();
        // const ex = await res.json();
        // console.log(ex);
        // return await ex;
        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResources(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
        );

        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const res = await this.getResources(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        // await console.log(res);

        return await this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (char) => {
        let imgStyle = "cover";
        if (!char.description) {
            char.description = "данных нет";
        }
        if (
            char.thumbnail.path ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
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
}

export default MarvelService;
