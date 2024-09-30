import React, { useState, useRef } from 'react';
import { FiPlus } from "react-icons/fi"

import './App.css';
import { add, remove } from './redux/reducers/tasks';
import { useAppDispatch, useAppSelector } from './redux/store';


function App() {
  const dispatch = useAppDispatch();

  const [newTask, setNewTask] = useState("")
  const { tasks } = useAppSelector((state) => state.task)
  const [check, setCheck] = useState<Array<number>>([])

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
  }

  const deleteMultiple = () => {

  }

  return (
    <div className="App">

      <div className='flex flex-row gap-4'>
        <input placeholder='Write a new task' className='p-4 h-18 mb-4 input' type='text' name="newTask" onChange={handleChange} value={newTask} />

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
            Tasks
          </h1>
          <p className='font-sans justify-self-end button px-6 py-2 font-bold'>Delete Selected</p>
        </div>: null
      }

      <div className='scroll'>
        {tasks.map((task, index) => (
          <div className='shadow-lg my-3 grid grid-cols-3 py-4 px-3 rounded card'>
            <div className='flex flex-row gap-2 col-span-2 self-center' >
              <input type='checkbox' checked={check.includes(index)} onClick={() => clickhandler(index)} />
              <p className={`font-mono ${check.includes(index) && "line-through "} text-xl`}>{task}</p>
            </div>

              <button className='font-sans justify-self-end button px-6 py-2' onClick={() => deleteTask(index)}>
                Delete
              </button>

          </div>

        ))}

      </div>
    </div >

  );
}

export default App;
