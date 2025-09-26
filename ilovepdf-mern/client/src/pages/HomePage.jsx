import React from 'react';
import ToolCard from '../components/ToolCard';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Your All-in-One PDF Tool</h1>
      <p>Easy-to-use tools for all your PDF needs.</p>
      
      <div className="tools-grid">
        <ToolCard 
          title="Compress PDF"
          description="Reduce the file size of your PDF documents."
          icon="📦" // You can replace this with an actual icon component
          path="/compress-pdf"
        />
        <ToolCard 
          title="Merge PDF"
          description="Combine multiple PDF files into one single document."
          icon="➕"
          path="/merge-pdf"
        />
        <ToolCard 
          title="Convert to Word"
          description="Turn your PDF files into editable Word documents."
          icon="📄"
          path="/convert-to-word"
        />
        {/* Add more ToolCard components for other tools */}
      </div>
    </div>
  );
};

export default HomePage;