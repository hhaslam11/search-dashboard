/**
 * Add spaces to a number to a currency-friendly format.
 * Example: 123456 --> 123 456
 * @param {string} currency unformatted string or integer.
 */
export default currency => currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");