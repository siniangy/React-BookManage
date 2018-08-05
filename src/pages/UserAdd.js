import React from 'react';
import UserEditor from '../components/UserEditor'

export default class UserAdd extends React.Component {
	//构造函数初始化state，这里不需要父组件的props
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		form: {
	// 			name: {
	// 				valid: false,
	// 				value: '',
	// 				error: ''
	// 			},
	// 			age: {
	// 				valid: false,
	// 				value: 0,
	// 				error: ''
	// 			},
	// 			gender: {
	// 				valid: false,
	// 				value: '',
	// 				error: ''
	// 			}
	// 		}
	// 	};
	// }
	// handleValueChange(field, value, type="string") {
	// 	if (type === 'number') {
	// 		value = +value;
	// 	}
	// 	const {form} = this.state;
	// 	const newFieldObj = {value, valid: true, error: ''};
	// 	switch (field) {
	// 		case 'name': {
	// 			if(value.length >= 5){
	// 				newFieldObj.error = '最多四个字符';
	// 				newFieldObj.valid = false;
	// 			} else if (value.length ===0){
	// 				newFieldObj.error = '请输入用户名';
	// 				newFieldObj.valid = false;
	// 			}
	// 			break;
	// 		}
	// 		case 'age': {
	// 			if(value >100 || value <=0){
	// 				newFieldObj.error = '请输入0-100之间数字';
	// 				newFieldObj.valid = false;
	// 			}
	// 			break;
	// 		}
	// 		case 'gender': {
	// 			if(!value) {
	// 				newFieldObj.error = '请选择性别';
	// 				newFieldObj.valid = false;
	// 			}
	// 			break;
	// 		}
	// 		default: break;
	// 	}
	// 	this.setState({
	// 		form: {
	// 			...form,
	// 			[field]: newFieldObj
	// 		}
	// 	})
	// }
	 render () {
    return (
        <UserEditor/>
    );
  }	
}
