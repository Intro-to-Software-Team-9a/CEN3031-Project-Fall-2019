export function getDuplicateLabels(questions) {
  const labelToCount = {};

  questions.forEach((question) => {
    question.possibleResponses.forEach((response) => {
      const currValue = labelToCount[response.label] || 0;
      labelToCount[response.label] = currValue + 1;
    });
  });

  return Object.keys(labelToCount).filter((label) => {
    return labelToCount[label] >= 2;
  });
}
