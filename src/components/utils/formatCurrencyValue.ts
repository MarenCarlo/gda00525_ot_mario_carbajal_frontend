/**
 *  Esta función nos ayuda para formatear valores monetarios
 */
export const formatCurrencyValue = (value: number) => {
    let formattedNumber = new Intl.NumberFormat("en-GB", { minimumFractionDigits: 2 }).format(Number(value));
    return "Q." + formattedNumber;
};