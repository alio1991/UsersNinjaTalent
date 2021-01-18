import React, { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser, editUser, getCountries } from '../../services/userService.js'
import './LandingView.scss';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import { EnvironmentOutlined, EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

export function LandingView() {

	const { Option } = Select;

	const [userForm] = Form.useForm();
	const [users, setUsers] = useState();
  	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [UserSelected, setUserSelected] = useState();
	const [countriesOptions, setcountriesOptions] = useState()


	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	
	useEffect(()=>{
		updateList();
		getCountries().then(res => res.json()).then(setcountriesOptions)
	},[]);


	const updateList = () => {
		getUsers().then(res => res.json()).then(users => setUsers(users));
	}

	const usingForm = (user) => {
		setUserSelected(user);
		userForm.resetFields();
		if(user){
			userForm.setFieldsValue(user);
			userForm.setFieldsValue(user.address);
			userForm.setFieldsValue({birthDate: moment(user.birthDate)})
		}
		setIsEditModalVisible(true);
	}


	const modifyUserInfo = (FormInfo) => {
		// const FormInfo = userForm.getFieldsValue();
		const address = {country:FormInfo.country, postalcode: FormInfo.postalcode, street: FormInfo.street, city: FormInfo.city};
		delete FormInfo.country
		delete FormInfo.postalcode
		delete FormInfo.street
		delete FormInfo.city
		FormInfo.address = address;
		FormInfo.birthDate = FormInfo.birthDate ? FormInfo.birthDate._i : undefined;
		if(FormInfo.birthDate){
			if(UserSelected){
				editUser(UserSelected._id,FormInfo).then(()=> {setIsEditModalVisible(false); updateList();});
				setIsEditModalVisible(false);
			}else{
				createUser(FormInfo).then(()=> {setIsEditModalVisible(false); updateList();});
			}
		}else{
			console.log('FECHA NECESARIA');
			// console.log(userForm.validateFields())
		}
	}

	const removeUser = (id) => {
		  Modal.confirm({
			title: '¿Are you sure?',
			icon: <ExclamationCircleOutlined />,
			content: 'You will delete this user.',
			okText: 'Delete',
			onOk(){deleteUser(id).then(()=> updateList())},
			cancelText: 'Cancel',
		});
	}

	const onFinish = (value) => {
		modifyUserInfo(value);
	}	
	
  return (
    <React.Fragment>
      <div className="landing-view">
				<h1>User List</h1>
				<div className="new-user">
					</div><button onClick={() => usingForm(undefined)}>Add user <PlusOutlined /></button>
				<div className="landing-view__user-list">
					{users&&users.map(user=>
						<div key={user._id} className="landing-view__user-list__user-row">
							<div className="landing-view__user-list__user-row__user-info">
								<div className="landing-view__user-list__user-row__user-info__name-email-container">
									{`${user.firstname} ${user.lastname}`}
								</div>
								<div className="landing-view__user-list__user-row__user-info__address">
									<EnvironmentOutlined /><p>{`${user.address.street},${user.address.city} - ${user.address.postalcode} (${user.address.country})`}</p>
								</div>
							</div>
							<div className="landing-view__user-list__user-row__options">
								<button className="edit-button" onClick={()=> usingForm(user)}><EditOutlined /></button>
								<button className="delete-button" onClick={()=> removeUser(user._id)}><DeleteOutlined /></button>
							</div>

						</div>
					)}
				</div>
				<Modal 
					title="Edit user modal" 
					visible={isEditModalVisible} 
					// onOk={()=> modifyUserInfo()} 
					okButtonProps={{
						form:"userForm",key:"submit", htmlType: 'submit'
					}}
					onCancel={()=>setIsEditModalVisible(false)}>
					
					<Form
						id='userForm'
						form = {userForm}
						{...layout}
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						// onFinishFailed={onFinishFailed}
					>
						<Form.Item
							label="First Name"
							name="firstname"
							rules={[{ required: true, message: 'Please input your firstname!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Last Name"
							name="lastname"
							rules={[{ required: true, message: 'Please input your lastname!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Email"
							name="email"
							rules={[{ required: true, message: 'Please input your email!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Birth Date"
							name="birthDate"
							rules={[{ required: true, message: 'Please input your birthDate!' }]}
						>
							<DatePicker onChange={(date, dateString)=> userForm.setFieldsValue(dateString ? {birthDate: moment(dateString)} : undefined)} />
						</Form.Item>

						<hr/>
						<Form.Item
							label="Street"
							name="street"
							rules={[{ required: true, message: 'Please input your street!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="City"
							name="city"
							rules={[{ required: true, message: 'Please input your city!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Country"
							name="country"
							rules={[{ required: true, message: 'Please input your country!' }]}
							defaultValue={countriesOptions}
						>
							{
							<Select style={{ width: '30%' }}>
								{
									countriesOptions&&countriesOptions.map(country =><Option key={country}>{country}</Option>)
								}
							</Select>
							}
						</Form.Item>

						<Form.Item
							label="Postal Code"
							name="postalcode"
							rules={[{ required: true, message: 'Please input your postalcode!' }]}
						>
							<Input />
						</Form.Item>

					</Form>
				</Modal>
      </div>
    </React.Fragment>
  )

}