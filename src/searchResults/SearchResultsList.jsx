import React from 'react'
import "./searchResults.css"
import Search from '../search/Search'
export default function SearchResultsList({ results, normalSearch}) {
  return (
    <div className='results-list'>
       {!normalSearch?
        results.map((result, id) => {
          return <div className='results-div'><Search result = {result} key = 
          {id} /></div>
        }):
        results.map((result, id) => {
          return <div className='results-div'><Search result = {result} key = 
          {id}  normalSearch={true} /></div>
        })

       }
    </div>
  )
} 
