import React from 'react';

const Modal = ({title, children}) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="modal bg-white w-3/5 h-2/3 rounded-lg">
        <div className='bg-black rounded-t-lg p-3 text-center mb-2' >
          <h1 className='text-white font-semibold text-2xl'>{title}</h1>
        </div>
          <div className="p-4 rounded-md">
            {
              children 
            }
          </div>
      </div>
    </div>
  );
};

export default Modal;