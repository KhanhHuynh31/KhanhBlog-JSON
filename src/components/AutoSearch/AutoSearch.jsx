import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AutoSearch(searchText) {
    const postListData = useSelector(state => state.PostReducer.posts);

    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const searchValue = new RegExp(searchText, 'i');
        const filtered = postListData.filter(entry =>
            Object.values(entry).some(val => typeof val === "string" && val.match(searchValue))
        );
        setFilteredPosts(filtered);
    }, [searchText, postListData]); // Dependency array includes searchText and postListData

    return (
        <>
            {filteredPosts.length === 0 ? (
                <div className="no__result">
                    <p>No result found</p>
                </div>
            ) : (
                filteredPosts.map((item, index) => (
                    <div className="posts__item" key={index}>
                        <Link to={"/detail/" + item.postId}>
                            <span>{item.postTitle}</span>
                        </Link>
                    </div>
                ))
            )}
        </>
    );
}
