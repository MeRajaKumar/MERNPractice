import React, { useState } from 'react';
import axios from 'axios';
// useNavigate को हटा दिया गया है क्योंकि इसकी ज़रूरत नहीं है
// import { useNavigate } from 'react-router-dom';

const CompressPDFPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadLink, setDownloadLink] = useState(null);
    const [error, setError] = useState(null);
    // const navigate = useNavigate(); // यह लाइन हटा दी गई है

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setDownloadLink(null);
        setError(null);
    };

    const onCompress = async () => {
        if (!selectedFile) {
            setError('Please select a file first.');
            return;
        }

        setIsProcessing(true);
        const formData = new FormData();
        formData.append('pdfFile', selectedFile);

        try {
            const res = await axios.post('http://localhost:5000/api/compress-pdf', formData, {
                responseType: 'blob', // Important for file download
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            setDownloadLink(url);
            setSelectedFile(null); // Clear the file input
        } catch (err) {
            console.error('Error compressing file:', err);
            setError('Error compressing the file. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="tool-page-container">
            <h1>Compress PDF</h1>
            <p>Reduce the size of your PDF without losing quality.</p>

            <input type="file" onChange={onFileChange} accept=".pdf" disabled={isProcessing} />

            {selectedFile && <p>Selected file: {selectedFile.name}</p>}

            <button onClick={onCompress} disabled={isProcessing || !selectedFile}>
                {isProcessing ? 'Processing...' : 'Compress PDF'}
            </button>

            {error && <p className="error-message">{error}</p>}

            {downloadLink && (
                <div className="download-area">
                    <p>Your compressed PDF is ready!</p>
                    <a href={downloadLink} download="compressed.pdf">
                        <button className="download-button">Download</button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default CompressPDFPage;