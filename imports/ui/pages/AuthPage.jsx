import React, { Component, PropTypes } from 'react';

const AuthPage = ({ content, link }) => (
  <div className="page auth">
    <div className="content-scrollable">
      {content}
      {link}
    </div>
  </div>
);

AuthPage.propTypes = {
  content: React.PropTypes.element,
  link: React.PropTypes.element,
};

export default AuthPage;
