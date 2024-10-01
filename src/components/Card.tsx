import React from "react";

type Props = {
  index: number
  check: Array<number>
  deleteTask: (val: number) => void
  clickhandler: (val: number) => void
  task: string
}

const Card = ({ index, check, deleteTask, clickhandler, task }: Props) =>  (
    <div className='shadow-lg my-3 grid grid-cols-3 py-4 px-3 rounded card' key={index}>
      <div className='flex flex-row gap-2 col-span-2 self-center' >
        <input type='checkbox' checked={check.includes(index)} onClick={() => clickhandler(index)} readOnly />
        <p className={`font-mono ${check.includes(index) && "line-through "} text-xl`}>{task}</p>
      </div>

      <button className='font-sans justify-self-end button px-6 py-2' onClick={() => deleteTask(index)}>
        Delete
      </button>

    </div>
  )

export default Card