export const useExtractDate = (arr)=>{

    const [year, month, day, hour, minute, second, nano] = arr;

    const date =  new Date(
        year,
        month - 1,   // correction JS
        day,
        hour,
        minute,
        second,
        nano / 1_000_000  // millisecondes
    );

    return { date };
}