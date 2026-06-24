const toTimestamp = value => {
  const timestamp = new Date(value || 0).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
};

export const sortEntriesByDateDesc = (entries, dateField) => {
  return [...(entries || [])].sort((left, right) => {
    const leftTimestamp = toTimestamp(left?.[dateField]);
    const rightTimestamp = toTimestamp(right?.[dateField]);

    if (leftTimestamp === null && rightTimestamp === null) return 0;
    if (leftTimestamp === null) return 1;
    if (rightTimestamp === null) return -1;

    return rightTimestamp - leftTimestamp;
  });
};

export const filterEntriesByYear = (entries, dateField, year) => {
  return (entries || []).filter(entry =>
    entry?.[dateField] ? entry[dateField].startsWith(year) : false
  );
};

export const summarizeEntriesByYear = (
  entries,
  {dateField, getCoverImage = null}
) => {
  const byYear = new Map();
  const sortedEntries = sortEntriesByDateDesc(entries, dateField);

  sortedEntries.forEach(entry => {
    const dateValue = entry?.[dateField] || "";
    const year = dateValue.slice(0, 4);

    if (!year) return;

    if (!byYear.has(year)) {
      byYear.set(year, {
        year,
        count: 0,
        latestDate: dateValue,
        coverImage: getCoverImage ? getCoverImage(entry) : null,
        items: []
      });
    }

    const summary = byYear.get(year);
    summary.count += 1;
    summary.items.push(entry);
  });

  return Array.from(byYear.values()).sort(
    (left, right) => Number(right.year) - Number(left.year)
  );
};
