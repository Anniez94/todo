import React, { useState, useEffect } from 'react';
import { FiPlus } from "react-icons/fi"

import './App.css';
import { add, remove, removeMultiple, cleanTask } from './redux/reducers/tasks';
import { useAppDispatch, useAppSelector } from './redux/store';
import Card from 'src/components/Card';

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
          onKeyDown={event => {
            if (event.key === 'Enter') {
              addNewTask()
            }
          }}
        />

        {newTask.length ?
          <div className='flex flex-row items-center gap-2 newTask mt-6 justify-self-start mb-6 h-18' onClick={addNewTask}>
            <FiPlus />
            <p>Add</p>
          </div> : <div />
        }

      </div>

      {tasks.length ?
        <div className='grid grid-cols-3 mb-2 mt-10'>
          <h1 className="text-4xl font-bold font-sans col-span-2">
            Task(s)
          </h1>
          {check.length ?
            <button className='font-sans justify-self-end button px-6 py-2 font-bold' onClick={deleteMultiple}>Delete Selected</button> : null}
        </div> : null
      }

      <div className='scroll'>
        {tasks.map((task, index) => (
          <Card
            index={index}
            task={task}
            deleteTask={deleteTask}
            clickhandler={clickhandler}
            check={check} />
        ))}

      </div>
    </div >

  );
}

export default App;
