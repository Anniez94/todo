import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';


const addTasks = (tasks: Array<string>) => {
  const input = screen.getByLabelText("input");

  tasks.map(task => {
    fireEvent.change(input, {target: {value: task}});
    const button = screen.getByTestId("add")
    fireEvent.click(button)
  })
   
}

describe("Test APP", () => {

  test(" 'Add' Button should not be in the document on the app's launch", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
    const addBtn = screen.queryByTestId("add")
    expect(addBtn).not.toBeInTheDocument()
  }) 
  
  test(" 'Tasks' heading not be in the document on the app's launch", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
    const tasks = screen.queryByTestId("tasks")
    expect(tasks).not.toBeInTheDocument()
  }) 
  
  test("'Add' Button should be in the document when the input field has a value", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
      const input = screen.getByLabelText("input")
      fireEvent.change(input, {target: {value: "Wash my car"}})
  
      const addBtn = screen.getByTestId("add")
      expect(addBtn).toBeInTheDocument()
  }) 

  test("Input value should equal target value", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
      const input = screen.getByLabelText("input")
      fireEvent.change(input, {target: {value: "Wash my car"}})
  
      expect(input).toHaveValue("Wash my car")
  }) 

  test("Input value should be empty after clicking on the add button", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
      const input = screen.getByLabelText("input")
      fireEvent.change(input, {target: {value: "Wash my car"}})

      const addBtn = screen.getByTestId("add")
      fireEvent.click(addBtn)
  
      expect(input).toHaveValue("")
  }) 

  test("Task Header should be in the document", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
      const input = screen.getByLabelText("input")
      fireEvent.change(input, {target: {value: "Wash my car"}})

      const addBtn = screen.getByTestId("add")
      fireEvent.click(addBtn)

      const taskHeader = screen.getByLabelText("tasks")
  
      expect(taskHeader).toBeInTheDocument()
  })

  test("Card component should render same text as input field", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
      const input = screen.getByLabelText("input")
      fireEvent.change(input, {target: {value: "Wash my car"}})

      const addBtn = screen.getByTestId("add")
      fireEvent.click(addBtn)

      const task = screen.getByText(/Wash my car/i)
      expect(task).toBeInTheDocument()
  })

  test("Card component should render all", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
     addTasks(["Wash my car", "Buy the food stuff", "Get the grocery"])
      const task = screen.getAllByTestId("task-container")
      expect(task).toHaveLength(3)
  })

  test("Delete Task 0", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
     addTasks(["Wash my car", "Buy the food stuff", "Get the grocery"])
      const tasks = screen.getAllByTestId("task-container")

      const getTasks = () => {
        return tasks.map((item) => (
          {
          name: within(item).getByTestId("name").textContent,
          deleteButton: within(item).getByTestId("delete")
        }
      ));
      }

      const deleteWash = getTasks().find((task) => task.name === "Wash my car")!.deleteButton

      fireEvent.click(deleteWash)
      expect(
        getTasks().find((character) => character.name === "Wash my car")
      ).not.toBeTruthy();
     
  })

  test("Delete Task", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
     addTasks(["Wash my car", "Buy the food stuff", "Get the grocery"])
      const deleteButton = screen.getAllByTestId('delete');
      fireEvent.click(deleteButton[1]);

      expect(screen.queryByText('Buy the food stuff')).not.toBeInTheDocument();
     
  })

  test("Mark a checkBox", () => {
    render(
      <Provider store={store}>
        <App />
       </Provider>
      );
  
     addTasks(["Wash my car", "Buy the food stuff", "Get the grocery"])
      const checkButton = screen.getAllByTestId('checkbox');
      fireEvent.click(checkButton[1]);

      expect(checkButton[1]).toBeChecked();
     
  })

})


