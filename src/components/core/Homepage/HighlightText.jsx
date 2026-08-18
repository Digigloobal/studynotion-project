import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className ='text-transparent bg-clip-text bg-[linear-gradient(90deg,_rgba(255,255,0,1)_0%,_rgba(0,188,212,1)_0%,_rgba(130,238,238,1)_100%)]' >
        {text}
    </span>
  )
}

export default HighlightText
