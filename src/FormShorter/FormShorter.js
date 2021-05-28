import React, {useState} from 'react';

const FormShorter = () => {
	const [inputValue, setInputValue] = useState('');
	const [showCopyBtn, setShowCopyBtn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [validateError, setValidateError] = useState(false);
	const [disableBtn, setDisableBtn] = useState(false);
	const changeSearchHandler = (e) => {
		e.preventDefault();
		setInputValue(e.target.value);
	}

	const copyHandler = (e) => {
		e.preventDefault();
		navigator.clipboard.writeText(inputValue);
	}

	const validateUrl = (str) => {
		let res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		return (res !== null);
	}

	const submitHandler = (e) => {
		e.preventDefault();
		if (validateUrl(inputValue)) {
			if (!disableBtn) {
				setLoading(true);
				setDisableBtn(true);
				setValidateError(false);
				fetch('https://devlo.ru/c/api.php',
					{ method: 'POST', body: JSON.stringify({url: inputValue}) })
					.then(function (response) {
						return response.json();
					})
					.then(function (responseJson) {
						setShowCopyBtn(true);
						setInputValue(responseJson.result);
						setLoading(false);
						setDisableBtn(false);
					});
			}
		} else {
			setValidateError(true);
		}

	}
	return (
		<div>
			<form onSubmit={submitHandler} className="shorter-form">
				<div className={`shorter-form-input ${loading? "shorter-form-input_loading":""}`}>
					<div className="container-input">
						<input
							type="text"
							value={inputValue}
							onChange={changeSearchHandler}
							placeholder="Paste URL"
						/>
						{
							validateError && <div className="error-container">
								<span className="error-message">Invalid URL</span>
							</div>
						}
					</div>

					<button className={`shorter-form-btn ${disableBtn? "shorter-form-btn_disable":""}`} onClick={submitHandler}>Blumb</button>
				</div>
				{
					!loading&&!validateError&&showCopyBtn&& <button className="shorter-form-btn" onClick={copyHandler}>Copy</button>
				}
			</form>
		</div>
	);
};

export default FormShorter;
