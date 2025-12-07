import {useState} from "react";

export default function useGenreHook() {

    const [genres, setGenres] = useState([
        {label: "Femme", value: "Femme"},
        {label: "Homme", value: "Homme"},
    ]);

    return {genres, setGenres};
}