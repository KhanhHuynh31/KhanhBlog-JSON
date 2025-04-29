import React, { useEffect } from 'react'
import "./Detail.css"
import { useParams, useLocation } from 'react-router-dom';
import LatestPosts from '../../../components/Posts/LatestPosts';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

export default function Detail() {
  let { id } = useParams();
  const postListData = useSelector(state => state.PostReducer.posts);
  const renderContent = () => {

    return postListData.filter(item => item.postId === id).map((item, index) => {
      return <div className='ql-editor' key={item.postId}>{parse(item.postContent)}</div>
    })
  }
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <LatestPosts />
      <div className='posts__detail'>
        {renderContent()}
      </div>
    </div>
  )
}
