export const CHANGE_FIELD = 'CHANGE_FIELD';

export function changeField(fieldName, newValue) {
  return {
    type: CHANGE_FIELD,
    data: {
      fieldName,
      newValue,
    },
  };
}
