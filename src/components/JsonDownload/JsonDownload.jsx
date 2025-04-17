import React from 'react';

const DownloadJson = ({ data }) => {
  const handleDownload = () => {
    const dataStr = JSON.stringify(data, null, 2); // Convert JSON to string
    const blob = new Blob([dataStr], { type: 'application/json' }); // Create a blob
    const url = URL.createObjectURL(blob); // Create a URL for the blob

    const a = document.createElement('a'); // Create an anchor element
    a.href = url; // Set the href to the blob URL
    a.download = 'backup.json'; // Set the file name
    document.body.appendChild(a); // Append to the body
    a.click(); // Trigger the download
    document.body.removeChild(a); // Clean up
    URL.revokeObjectURL(url); // Release the blob URL
  };

  return (
    <div>
      <button onClick={handleDownload} className='download__button'>Download</button>
    </div>
  );
};

export default DownloadJson;