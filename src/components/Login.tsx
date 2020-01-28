import React from 'react'
import { AUTH_TOKEN } from '../utils/constants'
import {Mutation} from 'react-apollo'
import {LOGIN_MUTATION, SIGNUP_MUTATION} from "../resolvers/mutation";
import {ILogData, IState} from "../interfaces/interfaces";
import {RouteChildrenProps} from "react-router";
import { Input, Button } from 'antd';

export const Login = (props: RouteChildrenProps) => {

	const init: IState = {
		login: true,
		email: '',
		password: '',
		name: '',
	};

	const [userInput, setUserInput] = React.useReducer(
		(state: IState, newState: IState): IState => ({ ...state, ...newState }),
		init
	);

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = evt.currentTarget;
		setUserInput({ [name]: value });
	};

	const confirm = async (data:any) => {
		const { token } = userInput.login ? data.login : data.signup
		saveUserData(token)
		props.history.push(`/`)
	}

	const saveUserData = (token:string) => {
		localStorage.setItem(AUTH_TOKEN, token)
	}

	const { login, email, password, name } = userInput

	return (
		<div>
			<h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
			<div className="flex flex-column">
				{!login && (
					<Input
						value={userInput.name}
						onChange={handleChange}
						name="name"
						placeholder="Your name"
					/>
				)}
				<br/>
				<Input
					value={userInput.email}
					onChange={handleChange}
					name="email"
					placeholder="Your email address"
				/>
				<br/>
				<Input
					value={userInput.password}
					onChange={handleChange}
					name="password"
					placeholder="Choose a safe password"
				/>
			</div>
			<div className="flex mt3">
				<Mutation
					mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
					variables={{ email, password, name }}
					onCompleted={(data:ILogData) => confirm(data)}
				>
					{(mutation:any) => (
						<Button
							onClick={mutation}
							type="primary"
						>
							{login ? 'login' : 'create account'}
						</Button>
					)}
				</Mutation>
				<Button
					type="primary"
					onClick={() => setUserInput({ login: !login })}
				>
					{login ? 'need to create an account?' : 'already have an account?'}
				</Button>
			</div>
		</div>
	)
}

