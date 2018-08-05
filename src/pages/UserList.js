import React from 'react';
import {del, get} from '../utils/request';

export default class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userList: []
		};
    //函数初始化就绑定this，带参数？
    // this.handleEdit = this.handleEdit.bind(this);
	}
	//render渲染之前componentWillMount的c是小写
	componentDidMount() {
		get('http://localhost:3000/user')
			// .then((res) => {console.log(res)})
			.then(res => {
				this.setState({
					userList: res
				})
			})
	}
  handleEdit(user) {
    this.props.history.push('/user/edit/'+user.id);
  }
  handleDel(user) {
    const confirmed = window.confirm(`确定要删除用户${user.name}吗？`);
    if(confirmed){
      del('http://localhost:3000/user/'+user.id)
      .then(res => {
        this.setState({
          userList: this.state.userList.filter(item => item.id !== user.id)
        });
        alert('删除用户成功');
      })
      .catch(err => {
        console.error(err);
      })
    }
  }
	render() {
		const {userList} = this.state;
		return (
      <table>
        <thead>
          <tr>
            <th>用户ID</th>
            <th>用户名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {
            userList.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td><button onClick={() => this.handleEdit(user)}>编辑</button></td>
                  <td><button onClick={() => this.handleDel(user)}>删除</button></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
	}
}