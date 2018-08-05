import React from 'react'; 
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import style from '../styles/home-layout.less';
import 'antd/dist/antd.css';
//布局组件,title和children,this.props.children是一个特殊的节点,它表示了组件的所有节点
// export default class HomeLayout extends React.Component {
// 	render() {
// 		const {title, children} = this.props;
// 		return (
// 			<div>
// 				<header>
// 					<h1>{title}</h1>
// 				</header>

// 				<main>
// 					{children}
// 				</main>
// 			</div>
// 		);
// 	}
// }

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class HomeLayout extends React.Component {
	render() {
		const {children} = this.props;
		return(
			<div>
				<header className={style.header}>
					<Link to='/'>祀念的Book</Link>
				</header>
				<main className={style.main}>
					<div className={style.menu}>
						<Menu mode='inline'  style={{width:'240px'}}>
							<SubMenu key='user' title={<span><Icon type="user"/><span>用户管理</span></span>}>
								<MenuItem key='user-list'>
									<Link to='/user/list'><Icon type="right-circle-o" />用户列表</Link>
								</MenuItem>
								<MenuItem key='user-add'>
									<Link to='/user/add'><Icon type="right-circle-o" />添加用户</Link>
								</MenuItem>
							</SubMenu>
							<SubMenu key='book' title={<span><Icon type='book'/><span>图书管理</span></span>}>
								<MenuItem key='book-list'>
									<Link to='/book/list'><Icon type="right-circle-o" />图书列表</Link>
								</MenuItem>
								<MenuItem key='book-add'>
									<Link to='/book/add'><Icon type="right-circle-o" />添加图书</Link>
								</MenuItem>
							</SubMenu>
						</Menu>
					</div>
					<div className={style.content}>
						{children}
					</div>
				</main>
			</div>
		)
	}
}