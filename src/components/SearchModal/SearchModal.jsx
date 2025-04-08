import React, { useEffect, useState } from 'react'
import "./SearchModal.css";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import  AutoSearch  from "../AutoSearch/AutoSearch";
export default function SearchModal({ onSendData, onClose }) {
    const navigate = useNavigate();
    const [openSearch, setOpenSearch] = useState(onSendData);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        setOpenSearch(onSendData);
    }, [onSendData]);
    const handleSearch = (event) => {
        event.preventDefault();
        if (searchText.trim() === "") {
            alert("You must enter a keyword")
        }
        else {
            onClose();
            navigate('/search/' + searchText)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch(event); // Call handleSearch when Enter is pressed
        }
    };
    return (
        <div className="modal__background"
            style={{ display: openSearch ? 'block' : 'none' }}>

            <div className="modal__content">
                <div className="modal__search">
                    <CiSearch className="modal__icon" />
                    <form className="modal__form">
                        <input
                            type="text"
                            className="modal__input"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown} // Listen for key down events

                        />
                    </form>
                    <IoIosClose className="modal__button" onClick={onClose}></IoIosClose>
                </div>
                <hr></hr>
                <div className="modal__result">
                    {AutoSearch(searchText)}
                </div>
            </div>
        </div>
    );
}
