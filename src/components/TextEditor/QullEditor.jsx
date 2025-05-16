import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
// Import JavaScript highlighting explicitly
import javascript from 'highlight.js/lib/languages/javascript';

// Register JavaScript as the default language
hljs.registerLanguage('javascript', javascript);

export default function QuillEditor({ value = '', onChange }) {
  const editorRef = useRef(null); 
  const quillRef = useRef(null); 
  const isMounted = useRef(false);
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],      
    ['blockquote', 'code-block'],
    ['image'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }], 
    [{ 'direction': 'rtl' }],                    
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }], 
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']                                
  ];
  useEffect(() => {
    if (!isMounted.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          syntax: {
            hljs: hljs,
          },
          toolbar: toolbarOptions
        },
      });
      quillRef.current.root.innerHTML = value;
      quillRef.current.on('text-change', () => {
        const html = quillRef.current.root.innerHTML;
        if (onChange) {
          onChange(html);
        }
      });

      isMounted.current = true;
    }
  }, []);
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