import React from 'react';
import { Link } from 'react-router-dom';

export let NavBar = () => {
  return (
    <div>
      <ul className="menu">
        <li>
          <Link to="/listAllLink">All Links</Link>
        </li>
        <li>
          <Link to="/cms">CMS</Link>
        </li>
      </ul>
    </div>
  );
}

