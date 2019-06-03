const {config} = require('./config');

/**
 * Calculate product price depreciation
 * @param {number} total - total price
 * @param {km} km - kilometers to the city
 * @returns {number} depreciation amount
 */
function calculateDepreciation (total, km){
  const {depreciationPercent} = config;
  const depreciation =  (km * (depreciationPercent / 100))/100;
  return (total * depreciation);
}
/**
 * Calculate best city to sell shellfish
 * @param {number} vieiras - vieiras price
 * @param {number} pulpo - pulpo price
 * @param {number} centollos - centollos price
 * @returns {String} - city object
 */
function getBestCity(vieiras, pulpo, centollos){
  const bestCity = {
    city: '',
    total: 0,
  };
  const {precios, costPerKm} = config;

  const cityObject = precios.reduce((valorAnterior, valorActual, i) => {
    const {vieirasPrice, pulpoPrice, centollosPrice, km, city} = valorActual;
    const priceTotal = (vieirasPrice * vieiras) + (pulpoPrice * pulpo) + (centollosPrice * centollos);
    const depreciation = calculateDepreciation(priceTotal, km);
    const tripCost = (km * 2)
    const total = priceTotal - depreciation -  tripCost;

    return total > valorAnterior.total?{city,total}:valorAnterior;
  }, {city:'', total:0});

  return cityObject.city;

}

console.log(getBestCity(50, 100, 50))
