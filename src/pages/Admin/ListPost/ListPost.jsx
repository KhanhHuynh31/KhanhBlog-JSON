import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ListPost.css"
import { DeletePostAction, GetPostAction, ResetSuccess, SearchPostAction } from "../../../redux/actions/PostAction"
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import DownloadJson from '../../../components/JsonDownload/JsonDownload';
import { FiDownload } from "react-icons/fi";

export default function ListPost() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.PostReducer);
  const binSizes = useSelector(state => state.PostReducer.binSizes);

  const postSearchData = useSelector(state => state.PostReducer.postSearch);
  let maxPostList = postSearchData.length;
  const [numberItem, setNumberItem] = useState(10);
  const [currentPage, setcurrentPage] = useState(1);
  const [pre, setPre] = useState(0);
  const handleAlert = () => {
    const readableText = binSizes
      .map((bin, index) => `Bin ${index} (${bin.startPostId} - ${bin.endPostId}) — ${bin.sizeKB.toFixed(2)} KB  `)
      .join("\n");
    alert(readableText);
  };
  const getBinIndexByPostId = (postId) => {
    for (let i = 0; i < binSizes.length; i++) {
      const { startPostId, endPostId } = binSizes[i];
      if (
        typeof startPostId === "number" &&
        typeof endPostId === "number" &&
        postId >= startPostId &&
        postId <= endPostId
      ) {
        return i;
      }
    }
    return null;
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setNumberItem(value);
    if (currentPage !== 1) {
      setPre(0);
      setcurrentPage(currentPage - 1);
    }
  };
  const [searchText, setSearchText] = useState()
  useEffect(() => {
    if (success === true) {
      toast.success('Successfully!');
      dispatch(ResetSuccess());
    }
  }, [success, dispatch]);

  useEffect(() => {
    dispatch(SearchPostAction(searchText))
  }, [searchText, dispatch]);

  const handleSubmitLogin = (event) => {
    event.preventDefault();
  }
  const getSearchText = (event) => {
    const value = event.target.value;
    setSearchText(value.trim());
  }

  const renderPostList = () => {

    return postSearchData.slice(pre, pre + numberItem).map((post, index) => {
      return <tr key={index}>
        <td>{post.postId}</td>
        <td>{post.postTitle}</td>
        <td>{post.postType}</td>
        <td>{post.postDate}</td>
        <td>
          <Link to={`/admin/edit-posts/${post.postId}`} className="button__action" onClick={() => { dispatch(GetPostAction(post.postId)) }}> <FiEdit /></Link>
          <a className="button__action" onClick={() => {
            if (window.confirm('Are you sure delete ' + post.postTitle)) {
              dispatch(DeletePostAction(getBinIndexByPostId(post.postId), post.postId));
            }
          }}> <AiOutlineDelete /></a>
        </td>
      </tr>
    })
  }
  return (
    <div className="list__content">
      <div className="list__header">
        <form onSubmit={handleSubmitLogin}>
          <input
            type="text"
            className="admin__search"
            placeholder="Search"
            onChange={getSearchText}
          />
        </form>

        <div className='download__content'>
          <button
            onClick={handleAlert}
          >
            Bin Capacity
          </button>
          <FiDownload />
          <DownloadJson data={postSearchData} />
        </div>
      </div>
      <div className="table__posts">
        <table className="table__template">
          <thead>
            <tr className="table__header">
              <th scope="col">ID</th>
              <th scope="col">{t("title")}</th>
              <th scope="col">{t("category")}</th>
              <th scope="col">{t("date")}</th>
              <th scope="col">{t("action")}</th>
            </tr>
          </thead>
          <tbody>{renderPostList()}</tbody>
        </table>
      </div>
      <div className="pagination">
        <div>
          <span>Row per page: </span>
          <select value={numberItem} onChange={handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
        <div>
          <span>
            {pre + 1}-{Math.min(currentPage * numberItem, maxPostList)} of {maxPostList}
          </span>
        </div>
        <FaAngleLeft
          onClick={() => {
            setPre(0);
            setcurrentPage(currentPage - 1);
          }}
          style={{ display: currentPage > 1 ? "block" : "none" }}
        />
        <FaAngleRight
          onClick={() => {
            setPre(currentPage * numberItem);
            setcurrentPage(currentPage + 1);
          }}
          style={{ display: maxPostList - pre - 1 < numberItem ? "none" : "block" }}
        />
      </div>
    </div>
  );
}
