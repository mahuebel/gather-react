import React, { Component, PropTypes } from 'react';

// a common layout wrapper for auth pages
const AuthPage = ({ content, link }) => (
  <div className="page auth">
    <div className="content-scrollable center-align">
      {content}
      {link}
      <img
	    src="/gather_logo.svg"
	    alt="Gather"
	  />
    </div>
  </div>
);

AuthPage.propTypes = {
  content: React.PropTypes.element,
  link: React.PropTypes.element,
};

export default AuthPage;