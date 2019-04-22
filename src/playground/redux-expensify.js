import { createStore, combineReducers, bindActionCreators } from "redux";

import uuid from "uuid";

// ADD_expense
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE EXPENSE

const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// EDIT EXPENSE

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// *************************************
//  EXPENSES REDUCER

const expenesesReducerDefaultState = [];

const expensesReducer = (state = expenesesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];

    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);

    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

//*******************************************************
//*******************************************************

// SET TEXT FILTER

const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

// SORT BY AMOUNT

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// SORT BY DATE

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// SET START DATE

const setStartDate = startDate => ({
  type: "SET_START_DATE",
  startDate
});

// SET END DATE

const setEndDate = endDate => ({
  type: "SET_END_DATE",
  endDate
});

// FILTER REDUCER

const filterReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

//*********************************************************** */
//*********************************************************** */

// timestamps (millisecond)
// January 1st 1970 (unix approach)
// 33400, 10, -203

// GET VISIBLE EXPENSES

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch =
        typeof text !== "string" ||
        expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  console.log(state.filters);
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log("-------------------");
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("e"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount()); //amount
// store.dispatch(sortByDate()); // date

// store.dispatch(setStartDate(0));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(2000));

// const demoState = {
//   expenses: [
//     {
//       id: "klj;lkj",
//       description: "January Expense",
//       note: "THis was the final payment for that address",
//       amount: 54500,
//       createdAt: 0
//     }
//   ],

//   filters: {
//     text: "rent",
//     sortBy: "amount", // date or amount
//     startDate: undefined,
//     endDate: undefined
//   }
// };

// const user = {
//   name: "jen",
//   age: 25
// };

// console.log({
//   ...user,
//   location: "kanpur",
//   age: 5555555
// });
