import React from 'react';
import {del, get} from '../utils/request';

export default class BookList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookList: []
		};
    //函数初始化就绑定this，带参数？
    // this.handleEdit = this.handleEdit.bind(this);
	}
	//render渲染之前componentWillMount的c是小写
	componentDidMount() {
		get('http://localhost:3000/book')
			.then(res => {
				this.setState({
					bookList: res
				})
			})
	}
  handleEdit(book) {
    this.props.history.push('/book/edit/'+book.id);
  }
  handleDel(book) {
    const confirmed = window.confirm(`确定要删除图书${book.name}吗？`);
    if(confirmed){
      del('http://localhost:3000/book/'+book.id)
      .then(res => {
        this.setState({
          bookList: this.state.bookList.filter(item => item.id !== book.id)
        });
        alert('删除图书成功');
      })
      .catch(err => {
        console.error(err);
      })
    }
  }
	render() {
		const {bookList} = this.state;
		return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>图书名</th>
            <th>价格</th>
            <th>Owner</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {
            bookList.map((book) => {
              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.price}</td>
                  <td>{book.owner_id}</td>
                  <td><button onClick={() => this.handleEdit(book)}>编辑</button></td>
                  <td><button onClick={() => this.handleDel(book)}>删除</button></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
	}
}