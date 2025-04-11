import React, { useEffect, useState } from 'react';
import "./PostsItem.css"
import { useParams, useLocation, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function PostsItem() {
  const { t } = useTranslation();
  const [count, setCount] = useState(6);
  let { id, tag, searchText } = useParams();
  const { search } = useLocation();
  const parameters = new URLSearchParams(search);
  const sortType = parameters.get('sortType');

  const postListData = useSelector(state => state.PostReducer.posts);
  const renderTags = (postTags) => {
    return postTags.split(',').map((item, index) => {
      return <div className='latest__tags' key={index}>
        {item}
      </div>
    })
  }
  const sortTypePost = () => {
    if (sortType === "1") {
      return (a, b) => a.postTitle - b.postTitle ? -1 : 1;
    }
    if (sortType === "2") {
      return (a, b) => a.postTitle - b.postTitle ? 1 : -1;
    }
  }
  useEffect(() => {
    if (searchText) {
      setCount(5);
    }
  }, [searchText]);
  const searchValue = new RegExp(searchText, 'i');
  const renderPostsBySearch = () => {
    return postListData.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.match(searchValue))).slice(0, count + 1).map((item, index) => {
      return <div className='posts__item' key={index}>
        <Link to={"/detail/" + item.postId}>
          <div className='item__picture'>
            <img src={item.postImage} alt="khanh's blog"></img>
          </div>
          <div className='item__text'>
            <h2>{item.postTitle}</h2>
            <p>{item.postDescription}</p>
          </div>
          {renderTags(item.postTags)}
        </Link>
      </div>
    })
  }
  const filterPosts = (postListData, postTypeId, tag) => {
    // First filter by postType
    let filteredPosts = postListData.filter(post => post.postType === postTypeId);

    // If a tag is provided, filter by postTags as well
    if (tag) {
        filteredPosts = filteredPosts.filter(post => post.postTags.includes(tag));
    }

    // If no posts found, filter by postTags if tag is provided
    if (filteredPosts.length === 0 && tag) {
        filteredPosts = postListData.filter(post => post.postTags.includes(tag));
    }

    // If still no posts found, return posts filtered only by postType
    if (filteredPosts.length === 0) {
        filteredPosts = postListData.filter(post => post.postType === postTypeId);
    }

    return filteredPosts;
};
  const renderPostsByType = () => {
    return filterPosts(postListData, id, tag).slice(0, count + 1).sort(sortTypePost()).map((item, index) => {
      return <div className='posts__item' key={index}>
        <Link to={"/detail/" + item.postId}>
          <div className='item__picture'>
            <img src={item.postImage} alt="khanh's blog"></img>
          </div>
          <div className='item__text'>
            <h2>{item.postTitle}</h2>
            <p>{item.postDescription}</p>
          </div>
          {renderTags(item.postTags)}
        </Link>
      </div>
    }

    )
  }
  const renderPosts = () => {
    return postListData.slice(0, count).sort(sortTypePost()).map((item, index) => {
      return <div className='posts__item' key={index}>
        <Link to={"/detail/" + item.postId}>
          <div className='item__picture'>
            <img src={item.postImage} alt="khanh's blog"></img>
          </div>
          <div className='item__text'>
            <h2>{item.postTitle}</h2>
            <p>{item.postDescription}</p>
          </div>
          {renderTags(item.postTags)}
        </Link>
      </div>
    })
  }
  const renderMore = () => {
    if (count < postListData.length) {
      return <button className='button__more' onClick={() => setCount(count + 4)}>
        {t('more posts')}
      </button>
    }
  }
  const renderMoreByType = () => {
    if (count < postListData.filter(post => post.postType === id).length) {
      return <button className='button__more' onClick={() => setCount(count + 4)}>
        {t('more posts')}
      </button>
    }
  }
  const renderMoreBySearch = () => {
    if (count < postListData.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.match(searchValue))).slice(0, count + 1).length) {
      return <button className='button__more' onClick={() => setCount(count + 4)}>
        {t('more posts')}
      </button>
    }
  }
  const renderSwitch = () => {
    if (id !== undefined || tag !== undefined) {
      return renderPostsByType();
    } else if (searchText !== undefined) {
      return renderPostsBySearch();
    } else {
      return renderPosts();
    }
  }
  return (
    <>
      <div className='posts__items'>
        {renderSwitch()}
      </div>
      <div className='items__more'>
        {(id === undefined && searchText === "") ? renderMore()
          : (searchText !== "" ? renderMoreBySearch()
            : renderMoreByType())}
      </div>
    </>
  )
}
