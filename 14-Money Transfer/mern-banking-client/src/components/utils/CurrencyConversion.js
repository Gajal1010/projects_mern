/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
export const convertionTypes = {
  CADtoMXN: "CADtoMXN",
  MXNtoCAD: "MXNtoCAD",
  CADtoUSD: "CADtoUSD",
  USDtoCAD: "USDtoCAD",
};
export const currencyTypes = {
  CAD: "CAD",
  MXN: "MXN",
  USD: "USD",
};
export function currencyConvert(type, amount) {
  switch (type) {
    case convertionTypes.CADtoMXN: {
      return amount * 10;
    }
    case convertionTypes.MXNtoCAD: {
      return amount / 10;
    }
    case convertionTypes.CADtoUSD: {
      return amount * 0.5;
    }
    case convertionTypes.USDtoCAD: {
      return amount / 0.5;
    }
    default: {
      return amount;
    }
  }
}
