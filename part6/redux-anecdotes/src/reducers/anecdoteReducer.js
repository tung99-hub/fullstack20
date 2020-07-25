import anecdoteService from '../services/anecdotes'

const sortByDescendingVotes = (list) => {
  return list.sort((a, b) => b.votes - a.votes)
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const votedAnecdote = state.find(a => a.id === action.data.id)
      const upVotedAnecdote = {...votedAnecdote, votes: votedAnecdote.votes + 1}
      const newState =  state.map(a => a.id === action.data.id ? upVotedAnecdote : a)
      
      return sortByDescendingVotes(newState)
    case 'NEW_ANECDOTE':
      return sortByDescendingVotes([...state, action.data])
    case 'INIT_ANECDOTES':
      return sortByDescendingVotes(action.data)
    default: 
      return sortByDescendingVotes(state)
  }
}

export const vote = (id) => { 
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const votedAnecdote = anecdotes.find(a => a.id === id)
    const upVotedAnecdote = {...votedAnecdote, votes: votedAnecdote.votes + 1}
    await anecdoteService.update(id, upVotedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }  
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer