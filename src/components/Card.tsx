import React from "react";

type Props = {
  check: Array<number>
  deleteTask: (val: number) => void
  clickhandler: (val: number) => void
  tasks: string[]
}

const Card = ({ check, deleteTask, clickhandler, tasks }: Props) => (
  <div className='scroll'>
    {tasks.map((task, index) => (
      <div className='shadow-lg my-3 grid grid-cols-3 py-4 px-3 rounded card' key={index} data-testid ="task-container">
        <div className='flex flex-row gap-2 col-span-2 self-center' >
          <input type='checkbox' checked={check.includes(index)} onClick={() => clickhandler(index)} readOnly data-testid="checkbox"/>
          <p className={`font-mono ${check.includes(index) && "line-through "} text-xl`} data-testid="name">{task}</p>
        </div>

        <button className='font-sans justify-self-end button px-6 py-2' onClick={() => deleteTask(index)} data-testid="delete">
          Delete
        </button>

      </div>
    ))}
  </div>

)

export default Card;