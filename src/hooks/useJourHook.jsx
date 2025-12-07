import {useState} from "react";

export const useJourHook = () => {
    const [jours, setJours] = useState([
        {label: "Lundi", value: 1},
        {label: "Mardi", value: 2},
        {label: "Mercredi", value: 3},
        {label: "Jeudi", value: 4},
        {label: "Vendredi", value: 5},
        {label: "Samedi", value: 6},
        {label: "Dimanche", value: 7}]);

    return {jours, setJours };
}