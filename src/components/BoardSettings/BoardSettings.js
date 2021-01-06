import React from 'react';

export default class BoardSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: 'blue2',
			showList: false
		};
		this.enableList = this.enableList.bind(this);
		this.disableList = this.disableList.bind(this);
		this.changeTheme = this.changeTheme.bind(this);
	}

	changeTheme(e) {
		const boards = document.getElementsByClassName('cg-wrap');
		const theme = e.currentTarget.dataset.id;
		for (let i = 0; i < boards.length; i++) {
			const board = boards.item(i);
			board.classList.remove(this.state.theme);
			board.classList.add(theme);
		}
		this.setState(({ showList }) => ({ theme, showList }));
	}

	enableList() {
		this.setState(({ theme }) => ({ theme, showList: true }));
	}

	disableList() {
		this.setState(({ theme }) => ({ theme, showList: false }));
	}
	render() {
		return (
			< div className="mt-3 ml-2 " >
				{!this.state.showList && <button onClick={this.enableList}>Show Settings</button>}
				{this.state.showList && <button onClick={this.disableList}>Hide Settings</button>}
				{this.state.showList && <ul style={{ listStyleType: 'none' }}>
					<li onClick={this.changeTheme} data-id="blue2">Blue 2</li>
					<li onClick={this.changeTheme} data-id="purple-diag">Purple Diag</li>
				</ul>}
			</div >
		);
	}
}
