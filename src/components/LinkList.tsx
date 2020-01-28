import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import {ILinkList} from "../interfaces/interfaces";
import {FEED_QUERY} from "../resolvers/query";
import {Icon, List} from 'antd';

export const  LinkList = () => {

	const { loading, data, error } = useQuery<ILinkList >(
			FEED_QUERY
		);

	if (loading) return  <Icon type="sync" spin />;
	if (error) return <p> `Error! ${error.message}` </p> ;
	if (data) return (
			<List
				itemLayout="horizontal"
				dataSource={data.feed.links}
				renderItem={item => (
					<List.Item>
						<List.Item.Meta
							title={item.url}
							description={item.description}
						/>
					</List.Item>
				)}
			/>
	);
	return null
}




