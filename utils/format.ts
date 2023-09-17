export const numberFormat = (number: number) =>
  new Intl.NumberFormat('ko-kr', {
    compactDisplay: 'short',
    notation: 'compact',
    maximumSignificantDigits: 3,
  }).format(number);
