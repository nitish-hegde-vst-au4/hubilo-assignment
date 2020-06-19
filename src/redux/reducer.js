import actionTypes from './actionTypes';
let id = 0;

const initialState = {
  usersList: [],
  error: null,
  userToEdit: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      const existingUser = state.usersList.find(
        (user) => user.email === action.payload.email
      );
      if (existingUser) {
        return { ...state, error: 'User already exists!' };
      }
      return {
        ...state,
        usersList: [...state.usersList, { ...action.payload, id: ++id }],
        error: null,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        userToEdit: null,
        error: null,
        usersList: state.usersList.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case actionTypes.EDIT_USER:
      return { ...state, error: null, userToEdit: action.payload };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        error: null,
        usersList: state.usersList.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};
