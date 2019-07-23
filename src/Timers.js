import React, { useReducer } from 'react';
import Timer from './Timer';
import './App.css';

// change to counter and start counter to know when to update child component
// child component has counter that is indepandant and always updates counter of main
// when timer is stoped
function Timers () {
  const reducer = (state, action) => {
    const { type, id, data } = action
    switch (type) {
      case 'START_TIMER': // starts tracking time for a specific issue
        return state.map((i, idx) => id === idx ? {
          ...i,
          startTimer: true,
          startTime: new Date().getTime()
        } : i)
      case 'STOP_TIMER': // stops tracking time for a specific issue
        return state.map((i, idx) => {
          if (id === idx) {
            console.log('timeee', i.time + Math.floor((new Date().getTime() - i.startTime)/1000))
            return {
              ...i,
              startTimer: false,
              startTime: null,
              time: i.time + Math.floor((new Date().getTime() - i.startTime)/1000)
            }
          }
          return i
        })
      case 'ADD_TIMER': // adds a new issue timer
        return state.concat({
          startTimer: false,
          time: 0,
          issue: ''
        })
      case 'CHANGE_TEXT': // changes issue number for a specific timer
        return state.map((i, idx) => {
          if (id === idx) {
            return {
              ...i,
              issue: data
            }
          }
          return i
        })
      case 'SEND_INTEGRATION': // sends integration to jira
        return state
      default:
        return state
    }
  }

  const [ timers, dispatch ] = useReducer(reducer, [])

  return (
    <div>
      {timers.map(({time, startTimer, issue}, idx) =>
      <div
        className="timer-block"
        key={idx}
      >
        <input
          type="text"
          value={issue}
          onChange={(event) => {
            dispatch({
              type: 'CHANGE_TEXT',
              id: idx,
              data: event.target.value
            })
          }}
        >
        </input>
        <Timer
          time={time}
          start={startTimer}
        />
        <button
          onClick={() => {
            dispatch({
              type: (startTimer ? 'STOP_TIMER' : 'START_TIMER'),
              id: idx
            })
          }}
        >
          {startTimer ? 'Stop' : 'Start'}
        </button>
      </div>
      )}
      <button onClick={() => {
        dispatch({
          type: 'ADD_TIMER'
        })
      }}>Add timer</button>
    </div>
  )
}

export default Timers