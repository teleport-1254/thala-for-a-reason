import React, { useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import boleJoKoyalVideo from './assets/videos/boleJoKoyal.mp4';
import shitVideo from './assets/videos/shit.mp4';
import "./assets/css/ctkcss.css";
import infoIcon from "./assets/images/info-icon.svg";
import githubIcon from "./assets/images/github-icon.svg"

function App() {
	const [message, setMessage] = useState('');
	const [thala, setThala] = useState(false);
	const [infoBtnClicked, setInfoBtnClicked] = useState(false);

	const isThala = (reason) => {
		if (reason === '') {
			return false;
		}
		let message;
		let n = parseInt(reason);
		if (!isNaN(n)) {
			let sum = 0;
			while (n !== 0) {
				sum = sum + n % 10;
				n = parseInt(n / 10);
			}
			if (sum === 7) {
				message = `${reason.split('').join(' + ')} = 7`;
				setMessage(message);
				return true;
			} else if (sum % 7 === 0) {
				message = `(${reason.split('').join(' + ')}) / ${parseInt(sum / 7)} = 7`;
				setMessage(message);
				return true;
			} else {
				setMessage(' ')
				return false;
			}
		} else {
			reason = reason.replace(' ', '');
			let len = reason.length;
			console.log(len);
			if (len === 7) {
				message = `${reason.split('').join(' + ')} = 7 letters`;
				setMessage(message);
				return true;
			} else if (len % 7 === 0) {
				message = `${reason.split('').join(' + ')} = ${len} letters = ${len}/${parseInt(len / 7)} = 7`;
				setMessage(message);
				return true;
			}
			else {
				setMessage(' ')
				return false;
			}
		}
		// return (result === 7 || result % 7 === 0);
	}

	const handleIsThalaBtnClick = () => {
		setInfoBtnClicked(false);
		setMessage('');
		const reasonInput = document.getElementById('reasonInput');
		// console.log(reasonInput.value);
		const reason = reasonInput.value;
		let result = isThala(reason.toLowerCase());
		setThala(result);
	}

	const handleInfoBtnClicked = () => {
		infoBtnClicked ? setInfoBtnClicked(false) : setInfoBtnClicked(true);
	}

	return (
		<div className="App">
			<div className="position-fixed top-50 start-50 translate-middle z-1">
				{thala &&
					<video src={boleJoKoyalVideo} style={{ 'height': '100vh' }} autoPlay onEnded={
						() => {
							setThala(false);
							setMessage('');
							document.getElementById('reasonInput').value = '';
						}
					} />
				}
				{
					(message === ' ') &&
					<video src={shitVideo} style={{ 'height': '100vh' }} autoPlay onEnded={
						() => {
							setThala(false);
							setMessage('');
							document.getElementById('reasonInput').value = '';
						}
					} />
				}
			</div>

			<div className="card position-fixed top-50 start-50 translate-middle z-2 trans-color-6">

				<div className="card-body">
					<a href='https://github.com/teleport-1254/thala-for-a-reason'>
						<img className="m-2" src={githubIcon} width={35} alt="infoBtn" />
					</a>

					<h5 className="card-title">THALA for a reason</h5>
					<h6 className="card-subtitle mb-2 text-body-secondary">check that reason there.</h6>
					<div className="text-center">
						<input id="reasonInput" className="form-control trans-color-6 text-center" type="search" placeholder="reason" aria-label="Search" />
						<button onClick={handleIsThalaBtnClick} type="button" className="btn btn-warning mt-2">isThala?</button>
					</div>
					{
						message !== '' &&
						<div className="card-text mt-3 text-center">
							{message}
							{
								message === ' ' &&
								'sum bhi 7 nahi aur letters bhi 7 nahi'
							}
							<h3>
								{
									thala ?
										'Message is CLEAR!' :
										'Message is NOT CLEAR!'
								}
								<br />
								{
									thala ?
										'😌' :
										'🥲'
								}
							</h3>
						</div>
					}
					<div className="position-absolute start-50 top-100 translate-middle">
						<img className="m-2" src={infoIcon} width={30} alt="infoBtn"
							onClick={handleInfoBtnClicked} />
					</div>
				</div>

				{infoBtnClicked &&
					<div id='info' className="pe-3">
						<p className="ps-2 m-0">
							cases:
						</p>
						<ul>
							<li>
								"1141" = 1+1+4+1 = 7
							</li>
							<li>
								"1141752" = 1+1+4+1+7+5+2 = 21 = 21/3 = 7
							</li>
							<li>
								"isThala" = 7 letters
							</li>
							<li>
								"ThalaForReason" = 14 letters = 14/2 = 7
							</li>
						</ul>
					</div>}

			</div>

		</div>
	);
}

export default App;
