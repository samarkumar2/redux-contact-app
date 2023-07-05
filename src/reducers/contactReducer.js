/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from "../actions/actionType";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_CONTACT:
      return [...state, Object.assign({}, action.contact)];
    case actionTypes.REMOVE_CONTACT:
      return state.filter((data, i) => i !== action.id);
    case actionTypes.EDIT_CONTACT:
      return state.map((data, i) =>
        data.id !== action.id
          ? {
              ...data,
            }
          : data
      );
    case actionTypes.UPDATE:
      return state?.map((data, i) => {
        if (i === action.id) {
          return {
            ...data,
            name: action.contact.name,
            number: action.contact.number,
          };
        } else return data;
      });
    default:
      return state;
  }
};
