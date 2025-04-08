import React from 'react'
import Slider from '../../components/Slider/Slider';
import LatestPosts from '../../components/Posts/LatestPosts';
import PostsItem from '../../components/Posts/PostsItem';

export default function Home() {
  return (
    <>
      <Slider />
      <LatestPosts />
      <PostsItem  />
    </>
  )
}
