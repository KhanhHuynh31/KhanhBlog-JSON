import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default function QuillEditor({ value = '', onChange }) {
  const editorRef = useRef(null); // DOM node
  const quillRef = useRef(null);  // Quill instance
  const isMounted = useRef(false);
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['image'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript      // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];
  useEffect(() => {
    if (!isMounted.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        },
      });

      // Set initial content
      quillRef.current.root.innerHTML = value;

      // Listen for changes and call onChange
      quillRef.current.on('text-change', () => {
        const html = quillRef.current.root.innerHTML;
        if (onChange) {
          onChange(html);
        }
      });

      isMounted.current = true;
    }
  }, []);

  // Update content if value prop changes from parent
  useEffect(() => {
    if (
      quillRef.current &&
      value !== quillRef.current.root.innerHTML
    ) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div
      ref={editorRef}
      style={{ minHeight: "269px"}}
    />
  );
}
