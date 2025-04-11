import React, { useEffect, useState } from 'react';
import "./PostsItem.css";
import { useParams, useLocation, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function PostsItem() {
  const { t } = useTranslation();
  const [count, setCount] = useState(5);
  const { id, tag, searchText } = useParams();
  const { search } = useLocation();
  const parameters = new URLSearchParams(search);
  const sortType = parameters.get('sortType');

  const postListData = useSelector(state => state.PostReducer.posts);

  useEffect(() => {
    if (searchText) {
      setCount(5);
    }
  }, [searchText]);

  const renderTags = (postTags) => {
    return postTags.split(',').map((item, index) => (
      <div className='latest__tags' key={index}>
        {item}
      </div>
    ));
  };

  const sortPosts = (a, b) => {
    if (sortType === "1") {
      return a.postTitle.localeCompare(b.postTitle);
    }
    if (sortType === "2") {
      return b.postTitle.localeCompare(a.postTitle);
    }
    return 0; // Default case if no sortType matches
  };

  const filterPosts = () => {
    let filteredPosts = postListData;

    if (id) {
      filteredPosts = filteredPosts.filter(post => post.postType === id);
    }

    if (tag) {
      filteredPosts = filteredPosts.filter(post => post.postTags.includes(tag));
    }

    if (searchText) {
      const searchValue = new RegExp(searchText, 'i');
      filteredPosts = filteredPosts.filter(entry => 
        Object.values(entry).some(val => typeof val === "string" && val.match(searchValue))
      );
    }

    return filteredPosts.sort(sortPosts).slice(0, count + 1);
  };

  const renderPosts = () => {
    return filterPosts().map((item, index) => (
      <div className='posts__item' key={index}>
        <Link to={`/detail/${item.postId}`}>
          <div className='item__picture'>
            <img src={item.postImage} alt="khanh's blog" />
          </div>
          <div className='item__text'>
            <h2>{item.postTitle}</h2>
            <p>{item.postDescription}</p>
          </div>
          {renderTags(item.postTags)}
        </Link>
      </div>
    ));
  };

  const renderMoreButton = () => {
    const hasMorePosts = count < filterPosts().length;
    if (hasMorePosts) {
      return (
        <button className='button__more' onClick={() => setCount(count + 4)}>
          {t('more posts')}
        </button>
      );
    }
    return null;
  };

  return (
    <>
      <div className='posts__items'>
        {renderPosts()}
      </div>
      <div className='items__more'>
        {renderMoreButton()}
      </div>
    </>
  );
}