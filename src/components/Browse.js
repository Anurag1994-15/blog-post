import React from 'react'
import Header from './Header'

import DisplayAllPosts from './DisplayAllPosts'
import ChatModal from './ChatModal'
const Browse = () => {
  return (
    <div>
      <Header/>
      <DisplayAllPosts />
      <ChatModal/>
    </div>
  )
}

export default Browse
