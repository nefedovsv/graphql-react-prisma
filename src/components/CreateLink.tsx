import React, {  useState  } from 'react'
import { useMutation } from '@apollo/react-hooks';
import {RouteChildrenProps} from "react-router";
import {IPost} from "../interfaces/interfaces";
import {POST_MUTATION} from "../resolvers/mutation";
import {Button, Input} from "antd";

export const CreateLink = (props: RouteChildrenProps) => {

	const [description, setDescription] = useState('');
	const [url, setUrl] = useState('');

	const [post, { error, data, loading }] = useMutation<
		{ post: IPost },
		{ description: string, url:string }
		>(POST_MUTATION, {
		variables: {description , url  }, onCompleted:() => props.history.push('/')
	});

	return (
			<div className="flex flex-column mt3">
				<Input
					className="mb2"
					onChange={e => setDescription(e.target.value)}
					placeholder="A description for the link"
				/>
				<br/>
				<Input
					className="mb2"
					onChange={e => setUrl(e.target.value)}
					placeholder="The URL for the link"
				/>
				<br/>
				<Button
					type = "primary"
					onClick={() => url && description  && post()}
				>
					Add new post
				</Button>
				{error ? <p>Oh no! {error.message}</p> : null}
				{loading ? <p>loading...</p> : null}
				{data && data.post ? <p>Saved!</p> : null}
			</div>
	);
}
