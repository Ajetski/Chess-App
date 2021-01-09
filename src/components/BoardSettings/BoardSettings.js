import { useState } from 'react';
import './BoardSettings.css'

function ListItem(props) {
	const active = props.currentTheme === props.id;
	return (
		<li onClick={props.handleClick} data-id={props.id}>
			<button type="button"
				className={`btn btn-${active ? 'primary' : 'secondary'}`}
				data-bs-dismiss="modal"
				disabled={active}>
				{props.name}
			</button>
		</li>
	);
}

export default function BoardSettings() {
	const [theme, setTheme] = useState('blue2')

	const changeTheme = (e) => {
		const boards = document.getElementsByClassName('cg-wrap');
		const newTheme = e.currentTarget.dataset.id;
		for (let i = 0; i < boards.length; i++) {
			const board = boards.item(i);
			board.classList.remove(theme);
			board.classList.add(newTheme);
		}
		setTheme(() => ({ newTheme }));
	}

	return (
		<div className='settingsBox m-3'>
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#settingsModal">
				Settings
				</button>
			<div className="modal" tabIndex="-1" id="settingsModal">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Board Settings</h5>
						</div>
						<div className="modal-body">
							<p>Select a board:</p>
							<ul>
								<ListItem name="Blue"
									id="blue"
									handleClick={changeTheme}
									currentTheme={theme}
								/>
								<ListItem name="Blue 2"
									id="blue2"
									handleClick={changeTheme}
									currentTheme={theme}
								/>
								<ListItem name="Purple Diag"
									id="purple-diag"
									handleClick={changeTheme}
									currentTheme={theme}
								/>
							</ul>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</ div >
	);
}
