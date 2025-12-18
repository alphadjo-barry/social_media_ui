import { useExtractDate } from "@hooks/useExtractDate.jsx";

export const useTimeAgo = (dateToString) => {
    const { date } = useExtractDate(dateToString);

    const now = new Date();
    const past = new Date(date);

    // Différence en millisecondes
    const diffInMilliSecondes = now - past;

    const diffInSec = Math.floor(diffInMilliSecondes / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHour = Math.floor(diffInMin / 60);
    const diffInDay = Math.floor(diffInHour / 24);

    // Calcul précis des années et des mois
    let yearDiff = now.getFullYear() - past.getFullYear();
    let monthDiff = now.getMonth() - past.getMonth();
    let dayDiff = now.getDate() - past.getDate();

    if (dayDiff < 0) {
        monthDiff -= 1;
    }

    if (monthDiff < 0) {
        yearDiff -= 1;
        monthDiff += 12;
    }

    // Gestion des affichages
    if (diffInSec < 60) return "Il y a quelques secondes";
    if (diffInMin < 60) return `Il y a ${diffInMin} minute${diffInMin > 1 ? "s" : ""}`;
    if (diffInHour < 24) return `Il y a ${diffInHour} heure${diffInHour > 1 ? "s" : ""}`;
    if (diffInDay < 7) return `Il y a ${diffInDay} jour${diffInDay > 1 ? "s" : ""}`;
    if (yearDiff === 0 && monthDiff > 0) return `Il y a ${monthDiff} mois`;
    if (yearDiff >= 1) return `Il y a ${yearDiff} an${yearDiff > 1 ? "s" : ""}`;

    // Au-delà de 7 jours et moins d'un mois, on peut afficher la date
    return past.toLocaleDateString("fr-FR");
};
