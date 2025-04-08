import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import "./LatestPosts.css"

export default function LatestPosts() {
    const { t } = useTranslation();
    let { id } = useParams();
    let isHome = false;
    const postListData = useSelector(state => state.PostReducer.posts);

    if (id === undefined) {
        isHome = true;
        id = Math.max(...postListData.map(o => o.postId), 0);
    }
    const renderTags = (postTags) => {
        return postTags.split(',').map((item, index) => {
            return <div className='latest__tags' key={index}>
                {item}
            </div>
        })
    }
    const renderPost = () => {
        return postListData.filter(item => item.postId.toString() === id.toString()).map((item, index) => {
            return <div className='posts__latest' key={index}>
                <div className='latest__picture'>
                    {isHome && <div className='posts__title'>{t('lastest posts')}</div>}
                    <img className='posts__picture' src={item.postImage} alt="khanh's blog"></img>
                </div>
                <div className='latest__text'>
                    {renderTags(item.postTags)}
                    <h1>{item.postTitle}</h1>
                    <p>{item.postDescription}</p>
                    {isHome && <Link to={"/detail/" + item.postId} className="lastest__more">{t('read more')}...</Link>}
                    <p className='latest__date'>{item.postDate}</p>
                </div>
            </div>
        })
    }
    return (
        <div className='posts__content'>
            {renderPost()}
        </div >
    )
}
