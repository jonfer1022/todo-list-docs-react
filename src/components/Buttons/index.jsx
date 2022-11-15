import './style.css'

const AddButton = ({ text, onClick, disabled = false }) => {
  return (
    <button 
      className={`${!disabled ? 'addbtn' : 'disable-btn'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

const NeutralButton = ({ text, onClick }) => {
  return (
    <button 
      className="neutralbtn"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

const RemoveButton = () => {
  return (
    <button>
      ADD
    </button>
  )
}

export { AddButton, RemoveButton, NeutralButton }