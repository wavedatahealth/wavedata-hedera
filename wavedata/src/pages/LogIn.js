import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import logoicon from "../assets/wave-data-logo.svg";
import useContract from "../services/useContract";
import {
	getConnectedAccountIds,
	hc,
	hcInitPromise,
  } from "../services/hashconnect";
import "./Login.css";


function Login() {
	const { isConnected, accountIds } = useSelector(
		(state) => state.hashconnect
	);
	let navigate = useNavigate();
	const { contract,  sendTransaction, ReadContractByQuery, } = useContract();
	const [isWalletConnected, setisWalletConnected] = useState(false);

	window.onload = (e) => {
		if (Cookies.get("login") === "true") {
			navigate("/studies", { replace: true });
		}
	};

	function registerLink() {
		navigate("/register", { replace: true });
	}

	async function onClickConnect(type) {
		if (type === 1) {
			if (isConnected) {
				await hcInitPromise;
				if (isConnected) {
					if (getConnectedAccountIds().length > 0) {
						hc.disconnect();
					}
				}
			} else {
				// open walletconnect modal
				hc.openPairingModal();
			}
			setisWalletConnected(true);
			window.localStorage.setItem("loggedin", "true");
		} else {
			setisWalletConnected(true);
		}
	}

	async function LoginClick(event) {
		event.target.disabled = true;
		var buttonTextBox = document.getElementById("buttonText");
		var LoadingICON = document.getElementById("LoadingICON");
		var SuccessNotification = document.getElementById("notification-success");
		var FailedNotification = document.getElementById("notification-error");
		buttonTextBox.style.display = "none";
		LoadingICON.style.display = "block";
		SuccessNotification.style.display = "none";
		FailedNotification.style.display = "none";

		var emailTXT = document.getElementById("email");
		var passwordTXT = document.getElementById("password");
		if (emailTXT.value === "" || passwordTXT.value === "") {
			FailedNotification.innerText = "Email and Password must be filled!";
			FailedNotification.style.display = "block";
			buttonTextBox.style.display = "block";
			LoadingICON.style.display = "none";
			return;
		}
		try {
			const result = await ReadContractByQuery(("CheckEmail"), [emailTXT.value]);

			if (result?.toString() === "False") {
				FailedNotification.innerText = "Email is not valid";
				FailedNotification.style.display = "block";
				buttonTextBox.style.display = "block";
				LoadingICON.style.display = "none";
				return;
			}
			let userid = await ReadContractByQuery(("Login"), [emailTXT.value, passwordTXT.value]);

			if (userid != "False") {
				LoadingICON.style.display = "none";
				buttonTextBox.style.display = "block";
				SuccessNotification.innerText = "Success!";
				SuccessNotification.style.display = "block";
				//Login success
				Cookies.set("login", "true");
				Cookies.set("userid", userid);
				navigate("/studies", { replace: true });
				return;
			} else {
				LoadingICON.style.display = "none";
				buttonTextBox.style.display = "block";
				FailedNotification.innerText = "Email/Password Incorrect";
				FailedNotification.style.display = "block";
			}
		} catch (error) {
			console.error(error);
			LoadingICON.style.display = "none";
			buttonTextBox.style.display = "block";
			FailedNotification.style.display = "none";
			FailedNotification.innerText = "Error! Please try again!";
		}
		event.target.disabled = false;
	}

	useEffect(() => {
		async function check() {
			var buttonTextBox = document.getElementById("buttonText");
			var LoadingICON = document.getElementById("LoadingICON");
			if (window.localStorage.getItem("loggedin") === "true") {
				
				setisWalletConnected(true);
			} else {
				setisWalletConnected(false);
			}
			if (isWalletConnected) {
				if (window.contract != null) {
					LoadingICON.style.display = "none";
					buttonTextBox.style.display = "block";
				} else {
					buttonTextBox.style.display = "none";
					LoadingICON.style.display = "block";
				}
			}
		}

		check();
	}, [contract]);

	return (
		<div className="min-h-screen grid-cols-2 flex">
			<div className="bg-blue-200 flex-1 img-panel">
				<img src={require("../assets/login-picture.png")} className="h-full w-full object-cover object-left" alt="WaveData Logo" />
			</div>
			<div className="bg-white flex-1 flex flex-col justify-center items-center">
				<div className="pl-20 pr-20 relative container-panel">
					<img src={logoicon} className="w-3/4 mx-auto" style={{ height: '18rem' }} alt="WaveData Logo" />
					<h1 className="text-4xl font-semibold mt-10 text-center">Your data is the cure.</h1>
					<p className="mt-3">By sharing data people can help finding the cure and be part of the solution.</p>
					<div id="notification-success" style={{ display: "none" }} className="mt-4 text-center bg-gray-200 relative text-gray-500 py-3 px-3 rounded-lg">
						Success!
					</div>
					<div id="notification-error" style={{ display: "none" }} className="mt-4 text-center bg-red-200 relative text-red-600 py-3 px-3 rounded-lg">
						Error! Please try again!
					</div>
					<div className="mt-10">
						<label className="flex flex-col font-semibold">
							Email
							<input type="email" id="email" name="email" className="mt-2 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400" />
						</label>
						<label className="flex flex-col font-semibold mt-3">
							Password
							<input type="password" id="password" name="password" className="mt-2 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400" />
						</label>
						{isWalletConnected ? (
							<>
								<button
									onClick={LoginClick}
									className={`bg-orange-500 text-white rounded-md shadow-md h-10 w-full mt-3 hover:bg-orange-600 transition-colors overflow:hidden flex content-center items-center justify-center cursor-pointer`}
								>
									<i id="LoadingICON" style={{ display: "none" }} className="select-none block w-min m-0 fa fa-circle-o-notch fa-spin"></i>
									<span id="buttonText">Login</span>
								</button>
							</>
						) : (
							<>
								<button
									onClick={(e) => {
										onClickConnect(1);
									}}
									className="bg-orange-500 text-white rounded-md shadow-md h-10 w-full mt-3 hover:bg-orange-600 transition-colors overflow:hidden flex content-center items-center justify-center cursor-pointer"
								>
									<span id="buttonText">Connect Hashpack</span>
								</button>

							</>
						)}

						<button onClick={registerLink} className="bg-gray-200 text-gray-500 rounded-md shadow-md h-10 w-full mt-3 hover:bg-black transition-colors">
							Register
						</button>

					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;

