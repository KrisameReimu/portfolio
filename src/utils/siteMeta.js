export const getCurrentYear = () => new Date().getFullYear();

export const formatYearRange = (startYear, endYear = getCurrentYear()) => {
  if (!startYear) return `${endYear}`;
  if (!endYear || startYear >= endYear) return `${startYear}`;
  return `${startYear}-${endYear}`;
};

export const formatCopyrightLabel = ({
  ownerName,
  ownerNameZh,
  startYear,
  endYear = getCurrentYear()
}) => {
  const owner = ownerNameZh ? `${ownerName} (${ownerNameZh})` : ownerName;
  return `© ${formatYearRange(startYear, endYear)} ${owner}`;
};
