import React from 'react'
import PostsItem from '../../../components/Posts/PostsItem'
import "./Category.css"
import { NavLink, Link } from "react-router-dom";

export default function Category() {

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
                            <li><NavLink to="/category/1" className={({ isActive }) => "category__link" + (isActive ? " category__active" : "")}>React JS</NavLink></li>
                            <li><NavLink to="/category/2" className={({ isActive }) => "category__link" + (isActive ? " category__active" : "")}>Utility</NavLink></li>
                            <li><NavLink to="/category/3" className={({ isActive }) => "category__link" + (isActive ? " category__active" : "")}>Other</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
