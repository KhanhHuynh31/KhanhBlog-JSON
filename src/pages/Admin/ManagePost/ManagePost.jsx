import React, { useState, useRef, useEffect } from 'react'
import "./ManagePost.css";
import { AddPostAction, ResetSuccess, UpdatePostAction } from '../../../redux/actions/PostAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';

export default function ManagePost() {
  const { theme } = useSelector((state) => state.WebReducer);
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

  const [editorText, setEditorText] = useState(postEditData.postContent || '');
  const postListData = useSelector(state => state.PostReducer.posts);
  const editorRef = useRef(useState(postEditData.postContent));
  const { success } = useSelector((state) => state.PostReducer);
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
      dispatch(UpdatePostAction(dataEdit));
    } else {

      let maxValueOfY = Math.max(...postListData.map(o => o.postId), 0);
      let dataPost = {
        ...formData,
        postContent: editorText,
        postDate: date,
        postId: maxValueOfY + 1
      };
      dispatch(AddPostAction(dataPost));
    }
  };
  const log = () => {
    if (editorRef.current) {
      setEditorText(editorRef.current.getContent());
    }
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
  }, [success, dispatch]);

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

              <input list="post-type"
                name="postType"
                className="post__category"
                value={formData.postType}
                onChange={handleChange}
                required />
              <datalist id="post-type">
                {postTypeData.map(postType => (
                  <option value={postType} />
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
            {/* <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder={t("Write your content here...")}
              rows="10"
              required
            /> */}
            <Editor
              key={theme}
              apiKey="qqcfb0qid0ghvvpl2t7ya6zeljdcmk0imjd2xxnnnawodpnn"
              onInit={(evt, editor) => (editorRef.current = editor)}
              className="my__editor"
              value={editorText}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "codesample",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",

                skin: theme === "dark" ? 'oxide-dark' : 'oxide',
                content_css: theme === "dark" ? 'dark' : 'default',
              }}
              onEditorChange={log}
            />
            <button className="post__save" type="submit">
              {t("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}