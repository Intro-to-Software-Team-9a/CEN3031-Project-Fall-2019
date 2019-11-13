import axios from 'axios';

export const SELECT_PLAN_START = 'SELECT_PLAN_START';
export const SELECT_PLAN_SUCCESS = 'SELECT_PLAN_SUCCESS';
export const SELECT_PLAN_FAIL = 'SELECT_PLAN_FAIL';

export function selectPlan(selectedPlan) {
  return async (dispatch) => {
    dispatch({ type: SELECT_PLAN_START });

    try {
      await axios.patch(
        '/api/profiles/plan',
        { plan: selectedPlan },
      );
      dispatch({ type: SELECT_PLAN_SUCCESS });
    } catch (error) {
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: SELECT_PLAN_FAIL, data: { message } });
    }
  };
}
