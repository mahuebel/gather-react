import React, { Component, PropTypes } from 'react';

export default class AuthPage extends Component {

	render() {
		return (
			<div className="page auth">
				<div className="content-scrollable">
					{this.props.children || "errawr"}
				</div>
			</div>
		);
	}
}

AuthPage.propTypes = {

};

export default AuthPage;
