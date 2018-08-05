import React from 'react';
import {withRouter} from "react-router-dom";
import FormItem from '../components/FormItem';
import formProvider from '../utils/formProvider';
import AutoComplete from '../components/AutoComplete';
import request, {get} from '../utils/request';

class BookEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendUsers: []
    }
  }
	componentDidMount () {
    const {editTarget, setFormValues} = this.props;
    if (editTarget) {
      setFormValues(editTarget);
    }
  }
	handleSubmit(e) {
		e.preventDefault();
		// alert(JSON.stringify(this.state));
		const {form: {name, price, owner_id}, formValid, editTarget} = this.props;
		if(!formValid) {
			alert('请输入正确的信息');
			return;
		}
    let editType = '添加';
    let apiUrl = 'http://localhost:3000/book';
    let method = 'post';
    if (editTarget) {
      editType = '编辑';
      apiUrl += '/' + editTarget.id;
      method = 'put';
    }

    request(method, apiUrl, {
      name: name.value,
      price: price.value,
      owner_id: owner_id.value
    })
      .then((res) => {
        if (res.id) {
          alert(editType + '图书成功');
          this.props.history.push('/book/list');
          return;
        } else {
          alert(editType + '失败');
        }
      })
      .catch((err) => console.error(err));
	}
  getRecommendUsers (partialUserId) {
    get('http://localhost:3000/user?id_like=' + partialUserId)
      .then((res) => {
        if (res.length === 1 && res[0].id === partialUserId) {
          // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
          return;
        }

        // 设置建议列表
        this.setState({
          recommendUsers: res.map((user) => {
            return {
              text: `${user.id}（${user.name}）`,
              value: user.id
            };
          })
        });
      });
  }

  timer = 0;
  handleOwnerIdChange (value) {
    this.props.onFormChange('owner_id', value);
    this.setState({recommendUsers: []});
    // let timer = 0;
    // 使用“节流”的方式进行请求，防止用户输入的过程中过多地发送请求
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (value) {
      // 200毫秒内只会发送1次请求
      this.timer = setTimeout(() => {
        // 真正的请求方法
        this.getRecommendUsers(value);
        this.timer = 0;
      }, 200);
    }
  }
	render() {
    const {recommendUsers} = this.state;
		const {form:{name, price, owner_id}, onFormChange} = this.props;
		return (
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<FormItem label="图书名: " valid={name.valid} error={name.error}>
						<input type="text" placeholder="最多只有20个字符" value={name.value} onChange={(e) => onFormChange('name',e.target.value)} />
					</FormItem>
					<br/>
					<br/>
					<FormItem label="价格: " valid={price.valid} error={price.valid}>
						<input type="number" placeholder="请输入0-10000" value={price.value || ''} onChange={(e) => onFormChange('price', +e.target.value)} />
					</FormItem>
					<br/>
					<br/>
					<FormItem label="owner_id: " valid={owner_id.valid} error={owner_id.error}>
					  <AutoComplete
              value={owner_id.value ? owner_id.value + '' : ''}
              options={recommendUsers}
              onValueChange={value => this.handleOwnerIdChange(value)}
            />
          </FormItem>
					<br/>
					<input type="submit" value="提交" />
				</form>
		)
	}
}
BookEditor = formProvider({
  name: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入图书名'
      },
      {
        pattern: /^.{1,20}$/,
        error: '图书名最多20个字符'
      }
    ]
  },
  price: {
    defaultValue: 0,
    rules: [
      {
        pattern: function (value) {
          return value >= 1 && value <= 10000;
        },
        error: '请输入1~10000的价格'
      }
    ]
  },
  owner_id: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return !!value;
        },
        error: '请选择owner'
      }
    ]
  }
})(BookEditor);
export default withRouter(BookEditor);