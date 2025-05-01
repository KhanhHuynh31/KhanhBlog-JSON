import React, { useState, useEffect } from 'react'
import "./ManagePost.css";
import { AddPostAction, ResetSuccess, UpdatePostAction } from '../../../redux/actions/PostAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import QuillEditor from '../../../components/TextEditor/QullEditor';

export default function ManagePost() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const postEditData = useSelector(state => state.PostReducer.postEdit);
  let { id } = useParams();
  const [formData, setFormData] = useState({
    postTitle: postEditData.postTitle || '',
    postDescription: postEditData.postDescription || '',
    postType: postEditData.postType || '',
    postTags: postEditData.postTags || '',
    postImage: postEditData.postImage || '',
  });
  const binSizes = useSelector(state => state.PostReducer.binSizes);
  const autoGetBinIndex = (binSizes) => {
    if (!Array.isArray(binSizes) || binSizes.length === 0) return 0;
  
    for (let i = 0; i < binSizes.length; i++) {
      if (binSizes[i].startPostId === null) {
        return i - 1 >= 0 ? i - 1 : 0;
      }
    }
  
    return binSizes.length - 1; // Trả về bin cuối cùng nếu không có bin nào có startPostId = null
  };
  const [editorText, setEditorText] = useState(postEditData.postContent || '');
  const postListData = useSelector(state => state.PostReducer.posts);
  const { success, error } = useSelector((state) => state.PostReducer);
  const [selectedBin, setSelectedBin] = useState(autoGetBinIndex(binSizes)); // Default to Bin 0
  const postTypeData = useSelector(state => state.PostReducer.postTypes);
  const onSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();
    if (id !== undefined) {
      let dataEdit = {
        ...formData,
        postContent: editorText,
        postDate: date,
        postId: id
      };
      dispatch(UpdatePostAction(selectedBin, dataEdit));
    } else {
      let maxValueOfY = Math.max(...postListData.map(o => o.postId), 0);
      let dataPost = {
        ...formData,
        postContent: editorText,
        postDate: date,
        postId: maxValueOfY + 1
      };

      dispatch(AddPostAction(selectedBin, dataPost));
    }
  };
  const handleContentChange = (content) => {
    setEditorText(content); // Update the state with new content
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  useEffect(() => {
    if (success === true) {
      toast.success('Successfully!');
      dispatch(ResetSuccess());
    }
    if (error !== null) {
      toast.error(error.message);
      dispatch(ResetSuccess());
    }
  }, [success, error, dispatch]);

  return (
    <div className="post__container">
      <div className="post__content">
        <form className="post__form" onSubmit={onSubmit}>
          <div className="item__left">
            <div className="post__item">
              <p>
                {t("post title")}
                <span className="alert__item"> *</span>
              </p>
              <input
                type="text"
                name="postTitle"
                value={formData.postTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="post__item">
              <p>
                {t("post description")}
                <span className="alert__item"> *</span>
              </p>
              <textarea
                name="postDescription"
                className="desc__input"
                value={formData.postDescription}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="item__right">
            <div className="post__item">
              <p>
                {t("post category")}
                <span className="alert__item"> *</span>
              </p>

              <input
                list="post-type"
                name="postType"
                className="post__category"
                value={formData.postType}
                onChange={handleChange}
                required
              />
              <datalist id="post-type">
                {postTypeData.map((postType) => (
                  <option key={postType} value={postType} />
                ))}
              </datalist>
            </div>

            <div className="post__item">
              <p>
                {t("post tag")}
                <span className="alert__item"> *</span>
              </p>
              <input
                type="text"
                name="postTags"
                placeholder={t("tag 1, tag 2, ...")}
                value={formData.postTags}
                onChange={handleChange}
                required
              />
            </div>
            <div className="post__item">
              <p>
                {t("post image")}
                <span className="alert__item"> *</span>
              </p>
              <input
                type="text"
                name="postImage"
                placeholder={t("image url: https://image.png")}
                value={formData.postImage}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="post__item main__input">
            <p>
              {t("post content")}
              <span className="alert__item"> *</span>
            </p>
            <QuillEditor value={editorText} onChange={handleContentChange} />
            <div className='bottom__button'>
              <select className="bin__select" value={selectedBin} onChange={(e) => setSelectedBin(e.target.value)}>
                <option value="0">Bin 0</option>
                <option value="1">Bin 1</option>
              </select>
              <button className="post__save" type="submit">
                {t("submit")}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}