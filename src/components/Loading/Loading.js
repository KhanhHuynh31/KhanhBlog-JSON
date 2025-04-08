
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import loadingPic from '../../assets/images/imgLoading/loading.gif';

export default function Loading() {
    const isLoading = useSelector(state => state.LoadingReducer.isLoading);

    return (
        <Fragment>
            {isLoading ?
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99 }}>
                    <img src={loadingPic} alt="loading" />
                </div> : ''

            }
        </Fragment>
    )
}