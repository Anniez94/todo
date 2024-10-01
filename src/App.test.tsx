import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store, { persistor } from './redux/store';


// test("Add Task Button should not be visible", () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>);
//   const addBtn = screen.findByTestId("disabed-add")
//   expect(addBtn).toBeDefined()

// }) 

test("Add Task Button should not be visible", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>);
  const addBtn = screen.findByTestId("add")
  expect(addBtn).toBeDefined()

}) 
