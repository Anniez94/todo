import React from "react";

type Props = {
    check: Array<number>
    deleteMultiple: () => void
}

const Header = ({check, deleteMultiple}: Props) => (
    <div className='grid grid-cols-3 mb-2 mt-10'>
    <h1 className="text-4xl font-bold font-sans col-span-2" aria-label='tasks'>
      Task(s)
    </h1>
    {check.length ?
      <button className='font-sans justify-self-end button px-6 py-2 font-bold' onClick={deleteMultiple}>Delete Selected</button> : null}
  </div>
);

export default Header;