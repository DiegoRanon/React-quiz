import React from 'react'

export default function StartScreen({ numQuestions, handleActive}) {
  return (
    <div>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className='btn btn-ui' onClick={handleActive}>Let's start!</button>
    </div>
  )
}
