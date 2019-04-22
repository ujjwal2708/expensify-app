import { createStore } from "redux";

//  DESTRUCTURING EXAMPLE

// Action Generator - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  // here payload = { incrementBy = 1 }
  type: "INCREMENT",
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({ count }) => ({
  // we force user to give value to set it value
  type: "SET",
  count
});

const resetCount = () => ({
  type: "RESET"
});

// Reducers
// 1: Reducers are pure function i.e. output is always determined by inputs
// 2: Never change state or action

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "SET":
      return {
        count: action.count
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// ACTION

// INCREMENT

// store.dispatch({
//   type: "INCREMENT",

//   incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(setCount({ count: 100 }));
