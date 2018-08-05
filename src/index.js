import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import UserAddPage from './pages/UserAdd';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';
import BookAddPage from './pages/BookAdd';
import BookListPage from './pages/BookList';
import BookEditPage from './pages/BookEdit';
import LoginPage from './pages/Login';
import HomeLayout from './layouts/HomeLayout';

// 注意route的使用，<Router>无法接受两个及以上元素，所以在Switch里定义route，exact定义更严格的匹配规则，不然/也可以匹配/user/add!!!
const Element = () => (
	<Switch>
		<HomeLayout>
			<Route exact path="/" component={HomePage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/user/add" component={UserAddPage} />
			<Route path="/book/add" component={BookAddPage} />
			<Route path="/user/list" component={UserListPage} />
			<Route path="/book/list" component={BookListPage} />
			<Route path="/user/edit/:id" component={UserEditPage} />
			<Route path="/book/edit/:id" component={BookEditPage} />
		</HomeLayout>
	</Switch>
)
ReactDOM.render((
  <Router>
  	<Element />
  </Router>
), document.getElementById('app'));