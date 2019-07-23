import React, { useState, useEffect } from 'react';

function Timer ({time, start}) {
  const [ count, setCounter ] = useState(time)
  function timeFormater(count) {
    let hours = 0
    let minutes = 0
    let seconds = 0
    hours = Math.floor(count / 3600)
    minutes = Math.floor((count - (hours * 3600)) / 60)
    seconds = ((count - (hours * 3600)) - (minutes * 60))
    return `
      ${hours === 0 ? '': `${hours}h`}
      ${minutes === 0 ? '' : `${minutes}min`}
      ${seconds}s
    `
  }

  useEffect(() => {
    if (start) {
      const to = setTimeout(() => {
          setCounter(count + 1)
      }, 1000)
      return () => clearTimeout(to)
    } 
  }, [count, start])

  useEffect(() => console.log('run run'), [])

  return (
    <div>
        {timeFormater(count)}
    </div>
  )
}

export default Timer