export const formatCurrency = (valor) => {
    return new Intl.NumberFormat('en-US', { currency: 'CLP' })
        .format(valor)
        .replace(/,/g, '.');
};