import {useExtractDate} from "@hooks/useExtractDate.jsx";

export const useTimeAgo = (dateToString)=>{
    const { date } = useExtractDate(dateToString);
    const now = new Date();
    const past = new Date(date);

    const diffInMilliSecondes = now - past;
    const diffInSec = Math.floor(diffInMilliSecondes / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHour = Math.floor(diffInMin / 60);
    const diffInDay = Math.floor( diffInHour / 24);
    const diffInMonth = Math.floor(diffInDay / 30);
    const diffInYear = Math.floor(diffInMonth / 12);

    if (diffInSec < 60) return "Il y a quelques secondes";
    if (diffInMin < 60) return `Il y a ${diffInMin} minute${diffInMin > 1 ? "s" : ""}`;
    if (diffInHour < 24) return `Il y a ${diffInHour} heure${diffInHour > 1 ? "s" : ""}`;
    if (diffInDay < 7) return `Il y a ${diffInDay} jour${diffInDay > 1 ? "s" : ""}`;
    if(diffInMonth < 12) return `Il y a ${diffInMonth} mois`;
    if(diffInYear >= 1) return `Il y a ${diffInYear} an${diffInYear > 1 ? "s" : ""}`;

    // Au-delà de 7 jours : format JJ/MM/AAAA
    return past.toLocaleDateString("fr-FR");
}