import React from 'react'
import PostsItem from '../../../components/Posts/PostsItem'
import "./Category.css"
import { NavLink, Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Category() {
    const postTypeData = useSelector(state => state.PostReducer.postTypes);
    const postTagData = useSelector(state => state.PostReducer.postTags);
    const { id, tag } = useParams();
    return (
        <div className='category__main'>
            <div className='category__header'>
                <div className='header__category'>
                    <h2>Category</h2>
                    <hr></hr>
                </div>
            </div>

            <div className='category__content'>
                <div className='content__main'>
                    <div className='content__order'>
                        <div className='order__left'>
                            <h3>Order by</h3>
                        </div>
                        <div className='order__right'>
                            <ul>
                                <li><Link to="?sortType=1">A-Z </Link></li>
                                <li><Link to="?sortType=2">Z-A </Link></li>
                            </ul>
                        </div>
                    </div>
                    <hr></hr>
                    <PostsItem />
                </div>
                <div className='content__list'>
                    <div className='category__item'>
                        <h3>Categories</h3>
                        <ul>
                            {postTypeData.map(postType => (
                                <li key={postType}>
                                    <NavLink
                                        to={tag ? `/category/type/${postType}/tag/${tag}` : `/category/type/${postType}`}
                                        className={({ isActive }) => "category__link" + (isActive ? " category__active" : "")}
                                    >
                                        {postType}
                                    </NavLink>
                                </li>
                            ))}  </ul>
                    </div>
                    <div className='tags__container'>
                        <h3>Tags</h3>
                        <div className='tags__box'>
                            {postTagData.map(postTag => (
                                <span key={postTag}>
                                    <NavLink
                                        to={id ? `/category/type/${id}/tag/${postTag}` : `/category/tag/${postTag}`}
                                        className={({ isActive }) => "latest__tags" + (isActive ? " category__active" : "")}
                                    >
                                        {postTag}
                                    </NavLink>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
