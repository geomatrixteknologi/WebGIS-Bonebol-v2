/**
 * Format currency to short Indonesian format
 * Milyar (M) = Billion
 * Juta (Jt) = Million
 * Ribu (Rb) = Thousand
 */
export const formatRupiahShort = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toFixed(1)}M`; // Milyar (Billion)
  } else if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(1)}Jt`; // Juta (Million)
  } else if (value >= 1_000) {
    return `Rp ${(value / 1_000).toFixed(1)}Rb`; // Ribu (Thousand)
  }
  return `Rp ${value}`;
};
