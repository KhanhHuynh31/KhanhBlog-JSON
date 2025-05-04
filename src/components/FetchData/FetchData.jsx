import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../redux/actions/PostAction';
import { fetchNoteData } from '../../redux/actions/NoteAction';

export default function FetchData() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchNoteData());
    }, [dispatch]);
    return null;
}
