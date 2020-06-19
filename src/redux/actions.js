import actionTypes from './actionTypes';

export const addUser = (payload) => ({
  type: actionTypes.ADD_USER,
  payload,
});

export const updateUser = (payload) => ({
  type: actionTypes.UPDATE_USER,
  payload,
});

export const deleteUser = (payload) => ({
  type: actionTypes.DELETE_USER,
  payload,
});

export const editUser = (payload) => ({
  type: actionTypes.EDIT_USER,
  payload,
});
