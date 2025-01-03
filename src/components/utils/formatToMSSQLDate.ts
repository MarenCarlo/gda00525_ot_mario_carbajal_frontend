/**
 * Funcion necesaria para formatear las fechas de los date pickers, para
 * agregarla a BD.
 */
export const formatToMSSQLDate = (date: Date | string): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Fecha no válida");
    }
    const pad = (num: number) => num.toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const month = pad(parsedDate.getMonth() + 1);
    const day = pad(parsedDate.getDate());
    const hours = pad(parsedDate.getHours());
    const minutes = pad(parsedDate.getMinutes());
    const seconds = pad(parsedDate.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};