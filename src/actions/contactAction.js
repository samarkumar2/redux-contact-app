import * as actionTypes from "../actions/actionType";

export const createContact = (contact) => {
  return {
    type: actionTypes.CREATE_NEW_CONTACT,
    contact: contact,
  };
};

export const deleteContact = (id) => {
  return {
    type: actionTypes.REMOVE_CONTACT,
    id: id,
  };
};

export const editContact = (data, index) => {
  return {
    type: actionTypes.EDIT_CONTACT,
    contact: data,
    id: index,
  };
};

export const updateContact = (contact, id) => {
  return {
    type: actionTypes.UPDATE,
    contact: contact,
    id: id,
  };
};
