import React from 'react';
import {withRouter} from "react-router-dom";
import FormItem from '../components/FormItem';
import formProvider from '../utils/formProvider';
import request from '../utils/request';

class UserEditor extends React.Component {
	 componentDidMount () {
    const {editTarget, setFormValues} = this.props;
    if (editTarget) {
      setFormValues(editTarget);
    }
  }
	handleSubmit(e) {
		e.preventDefault();
		// alert(JSON.stringify(this.state));
		const {form: {name, age, gender}, formValid, editTarget} = this.props;
		if(!formValid) {
			alert('请输入正确的信息');
			return;
		}
    let editType = '添加';
    let apiUrl = 'http://localhost:3000/user';
    let method = 'post';
    if (editTarget) {
      editType = '编辑';
      apiUrl += '/' + editTarget.id;
      method = 'put';
    }

    request(method, apiUrl, {
      name: name.value,
      age: age.value,
      gender: gender.value
    })
      .then((res) => {
        if (res.id) {
          alert(editType + '用户成功');
          this.props.history.push('/user/list');
          return;
        } else {
          alert(editType + '失败');
        }
      })
      .catch((err) => console.error(err));
	}
	render() {
		const {form:{name, age, gender}, onFormChange} = this.props;
		return (
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<FormItem label="用户名: " valid={name.valid} error={name.error}>
						<input type="text" placeholder="最多只有4个字符" value={name.value} onChange={(e) => onFormChange('name',e.target.value)} />
					</FormItem>
					<br/>
					<br/>
					<FormItem label="年龄: " valid={age.valid} error={age.valid}>
						<input type="number" placeholder="请输入0-100" value={age.value || ''} onChange={(e) => onFormChange('age', +e.target.value)} />
					</FormItem>
					<br/>
					<br/>
					<FormItem label="性别: " valid={gender.valid} error={gender.error}>
						<select value={gender.value} onChange={(e) => onFormChange('gender',e.target.value)}>
							<option value=" ">请选择</option>
							<option value="male">男</option>
							<option value="female">女</option>
						</select>
					</FormItem>
					<br/>
					<input type="submit" value="提交" />
				</form>
		)
	}
}
UserEditor = formProvider({
  name: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入用户名'
      },
      {
        pattern: /^.{1,4}$/,
        error: '用户名最多4个字符'
      }
    ]
  },
  age: {
    defaultValue: 0,
    rules: [
      {
        pattern: function (value) {
          return value >= 1 && value <= 100;
        },
        error: '请输入1~100的年龄'
      }
    ]
  },
  gender: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return !!value;
        },
        error: '请选择性别'
      }
    ]
  }
})(UserEditor);
export default withRouter(UserEditor);