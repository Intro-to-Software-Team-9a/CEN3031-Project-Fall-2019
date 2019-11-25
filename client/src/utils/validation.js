export function getDuplicateLabels(responses) {
  const labelToCount = {};

  responses.forEach((response) => {
    const currValue = labelToCount[response.label] || 0;
    labelToCount[response.label] = currValue + 1;
  });

  return Object.keys(labelToCount).filter((label) => labelToCount[label] >= 2);
}
