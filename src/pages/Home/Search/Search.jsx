import React from 'react'
import { useParams } from 'react-router-dom';
import PostsItem from '../../../components/Posts/PostsItem'
import "./Search.css"

export default function Search() {
    let { searchText } = useParams();
    return (
        <div>
            <div className='search__header'>
                <h3>Search results for keyword: {searchText}</h3>
            </div>
            <div className='search__result'>
                <PostsItem />
            </div>
        </div>
    )
}
