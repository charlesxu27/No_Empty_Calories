import * as React from "react"
import "./Chip.css"

// To check that it is working as expected, update the isActive prop for each Chip to be true whenever that Chip's category is equal to the one in state.

export function Chip({ label = "", isActive = false, onClick = () => {} }) {
  let buttonClassName = ""
  isActive ? buttonClassName = "chip active" : buttonClassName = "chip";
  return (
    <button className={buttonClassName} onClick={onClick}>
      <p className="label">{label}</p>
      <span className="close" role="button">{`X`}</span>
    </button>
  )
}

export default Chip
