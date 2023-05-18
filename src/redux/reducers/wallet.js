// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE_START,
  EDIT_EXPENSE_DONE,
  ADD_CSV_TAGS,
} from '../actions/actionTypes';

let INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  tags: [],
  newId: 0,
};

const savedWallet = localStorage.getItem('reduxWallet');
if (savedWallet) {
  const wallet = JSON.parse(savedWallet);
  INITIAL_STATE = { ...wallet };
}

const reduxToLocalStorage = (state) => {
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('reduxWallet', JSON.stringify(state));
  });
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: ['BRL', ...action.payload] };
  case ADD_EXPENSE:
    reduxToLocalStorage({
      ...state,
      newId: state.newId + 1,
      expenses: [...state.expenses, { id: state.newId, ...action.payload }],
    });
    return {
      ...state,
      newId: state.newId + 1,
      expenses: [...state.expenses, { id: state.newId, ...action.payload }],
    };
  case REMOVE_EXPENSE:
    reduxToLocalStorage({ ...state, expenses: [...action.payload] });
    return { ...state, expenses: [...action.payload] };
  case EDIT_EXPENSE_START:
    return { ...state, editor: true, idToEdit: action.payload };
  case EDIT_EXPENSE_DONE:
    reduxToLocalStorage({
      ...state,
      expenses: [...action.payload],
      editor: false,
      idToEdit: 0,
    });
    return {
      ...state,
      expenses: [...action.payload],
      editor: false,
      idToEdit: 0,
    };
  case ADD_CSV_TAGS:
    return { ...state, tags: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
