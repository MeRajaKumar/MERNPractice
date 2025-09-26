import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard = ({ title, description, icon, path }) => {
  return (
    <Link to={path} className="tool-card">
      <div className="icon">{icon}</div>
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
    </Link>
  );
};

export default ToolCard;