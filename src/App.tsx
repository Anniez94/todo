import React, { useState, useEffect } from 'react';


import { add, remove, removeMultiple, cleanTask } from './redux/reducers/tasks';
import { useAppDispatch, useAppSelector } from './redux/store';
import Card from 'src/components/Card';
import Header from 'src/components/Header';
import AddBtn from 'src/components/AddBtn';

import './App.css';

function App() {
  const dispatch = useAppDispatch();

  const [newTask, setNewTask] = useState("")
  const { tasks } = useAppSelector((state) => state.task)
  const [check, setCheck] = useState<Array<number>>([])

  useEffect(() => {
    dispatch(cleanTask())
  }, [])

  const addNewTask = () => {
    dispatch(add(newTask))
    setNewTask("")
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewTask(event.target.value);
  };

  const checkBox = (id: number) => {
    if (check.includes(id)) {
      setCheck([...check.filter((val) => val !== id)])
    }
    else {
      setCheck([...check, id])
    }
  };

  const clickhandler = (index: number) => {
    checkBox(index)
  };

  const deleteTask = (id: number) => {
    dispatch(remove(id))
    if (check.includes(id)) {
      setCheck([...check.filter((val) => val !== id)])
    }
  }

  const deleteMultiple = () => {
    dispatch(removeMultiple(check))
    setCheck([])
  }

  return (
    <div className="App">

      <div className='flex flex-row gap-4'>
        <input
          placeholder='Write a new task'
          className='p-4 h-18 mb-4 input'
          type='text'
          name="newTask"
          onChange={handleChange}
          value={newTask}
          aria-label="input"
          onKeyDown={event => {
            if (event.key === 'Enter') {
              addNewTask()
            }
          }}
        />

        {!!newTask.length && <AddBtn addNewTask={addNewTask} />}

      </div>

      {!!tasks.length &&
        <Header
          check={check}
          deleteMultiple={deleteMultiple}
        />
      }

      <Card
        tasks={tasks}
        deleteTask={deleteTask}
        clickhandler={clickhandler}
        check={check}
      />
    </div >

  );
}

export default App;
