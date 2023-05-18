import {
  SUBMIT_USER_LOGIN_DATA,
  GET_CURRENCIES,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE_START,
  EDIT_EXPENSE_DONE,
  ADD_CSV_TAGS,
} from './actionTypes';

const BRL = { ask: 1, name: 'Real Brasileiro' };

// USER
export const userLoginData = (userEmail) => ({
  type: SUBMIT_USER_LOGIN_DATA,
  payload: userEmail,
});

// CURRENCIES DATA
export const getCurrencies = (data) => ({ type: GET_CURRENCIES, payload: data });

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(getCurrencies(Object.keys(data)));
  } catch (error) {
    console.error(error);
  }
};

// EXPENSES
export const addExpense = (expenseData) => ({ type: ADD_EXPENSE, payload: expenseData });

export const fetchQuotation = (expenseData) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(addExpense({ ...expenseData, exchangeRates: { BRL, ...data } }));
  } catch (error) {
    console.error(error);
  }
};

export const removeExpense = (expenses) => ({ type: REMOVE_EXPENSE, payload: expenses });

export const editExpenseStart = (id) => ({ type: EDIT_EXPENSE_START, payload: id });

export const editExpenseDone = (expen) => ({ type: EDIT_EXPENSE_DONE, payload: expen });

// CSV
export const addCsvTags = (csvTags) => ({ type: ADD_CSV_TAGS, payload: csvTags });
