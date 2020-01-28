import React, {useState} from 'react'
import {Link, RouteComponentProps} from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../utils/constants'
import { Menu,Button } from 'antd';

const Header = (props:RouteComponentProps) => {

		const [link, setLink] = useState('post');
		const {history} = props
		const authToken = localStorage.getItem(AUTH_TOKEN)

		return (
			<Menu  mode="horizontal"
				   onClick={e=>setLink(e.key)}
				   selectedKeys={[link]}
				   theme={"dark"}
			>
				<Menu.Item key="post">
					<Link to="/">
						Post
					</Link>
				</Menu.Item>
				<Menu.Item key="search">
					<Link to="/search">
						Search
					</Link>
				</Menu.Item>
				{authToken && (
                    <Menu.Item key="submit">
                        <Link to="/create" >
                            Submit
                        </Link>
                    </Menu.Item>
				)}
				{authToken ? (
					<Button
						type="primary"
						onClick={(props) => {
							localStorage.removeItem(AUTH_TOKEN)
							history.push(`/`)
						}}
					>
						Logout
					</Button>
				) : (
                    <Menu.Item key="login">
                        <Link to="/login" >
                            Login
                        </Link>
                    </Menu.Item>
				)}
			</Menu>
		)
	}


export default withRouter(Header)
