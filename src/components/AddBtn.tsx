import React from "react";
import { FiPlus } from "react-icons/fi";

type Props = {
    addNewTask: () => void
}

const AddBtn = ({addNewTask}: Props) => (
    <div
    className='flex flex-row items-center gap-2 newTask mt-6 justify-self-start mb-6 h-18'
    onClick={addNewTask}
    data-testid="add">
    <FiPlus />
    <p>Add</p>
  </div>
);

export default AddBtn;