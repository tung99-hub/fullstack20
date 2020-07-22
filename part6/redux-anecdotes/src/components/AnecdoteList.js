import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes).filter(a => a.content.toLowerCase().includes(filter))

  const dispatch = useDispatch()
  
  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(notificationChange(`You voted for '${anecdote.content}'`))
    setTimeout(() => {
      notificationRemove()
    }, 5000)
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList