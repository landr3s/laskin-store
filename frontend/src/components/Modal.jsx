function Modal({ isOpen, handleClose, children }) {
  return (
    isOpen && (
      <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/90'>
        <button
          className='absolute top-0 right-0 mr-3 my-2'
          onClick={handleClose}
        >
          X
        </button>
        {children}
      </div>
    )
  )
}

export default Modal
