import * as React from "react"
import "./Instructions.css"

export function Instructions({data={}, status="start"}) {
  return (
    <aside className="instructions">
      <p>{data[status]}</p>
    </aside>
  )
}

export default Instructions
