import React from 'react';
import UserEditor from '../components/UserEditor';
import {get} from '../utils/request';

export default class UserEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
    get('http://localhost:3000/user/' + userId)
      .then(res => {
        this.setState({
          user: res
        });
      });
  }

  render () {
    const {user} = this.state;
    return (
      user ? <UserEditor editTarget={user}/> : '加载中...'
    );
  }
}
