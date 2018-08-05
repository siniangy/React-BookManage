import React from 'react';
import BookEditor from '../components/BookEditor';
import {get} from '../utils/request';

export default class bookEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      book: null
    };
  }

  componentDidMount() {
    const bookId = this.props.match.params.id;
    get('http://localhost:3000/book/' + bookId)
      .then(res => {
        this.setState({
          book: res
        });
      });
  }

  render () {
    const {book} = this.state;
    return (
      book ? <BookEditor editTarget={book}/> : '加载中...'
    );
  }
}
