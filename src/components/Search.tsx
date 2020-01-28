import React, { useState} from 'react'
import { withApollo } from 'react-apollo'
import {FEED_SEARCH_QUERY} from "../resolvers/query";
import {IPost} from "../interfaces/interfaces";
import {Input, Button, List} from 'antd';


const Search = ({client}:any) => {

	const [filter, setFilter] = useState('');
	const [links, setLinks] = useState([]);

	const executeSearch = async () => {

		const result = await client.query({
			query: FEED_SEARCH_QUERY,
			variables:  {filter} ,
			onCompleted:()=>setLinks(result.data.feed.links)
		});
		return (()=>setLinks(result.data.feed.links))()
	}

		return (
			<div>
				<div>
					Search
					<Input
						onChange={e => setFilter(e.target.value)}
					/>
					<Button onClick={() => executeSearch()}> OK </Button>
				</div>
				<List
					itemLayout="horizontal"
					dataSource={links}
					renderItem={(item:IPost) => (
						<List.Item>
							<List.Item.Meta
								title={item.url}
								description={item.description}
							/>
						</List.Item>
					)}
				/>
			</div>
		)
	}

export default withApollo(Search)
