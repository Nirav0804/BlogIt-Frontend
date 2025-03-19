import React from 'react'
import GradientBackground from '../components/GradiantBackground/GradiantBackground'
import PostDetails from '../components/Posts/PostDetails'
import { useParams } from 'react-router-dom'

const PostDetailsPage = () => {

  const { id } = useParams();
  
  return (
    <GradientBackground>
        <PostDetails postId={id}/>
    </GradientBackground>
  )
}

export default PostDetailsPage