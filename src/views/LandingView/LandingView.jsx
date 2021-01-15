import React, { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser, editUser } from '../../services/userService.js'
import './LandingView.scss';
import { Modal, Form, Input, DatePicker } from 'antd';
import { EnvironmentOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

export function LandingView() {

	const [userForm] = Form.useForm();
	const [users, setUsers] = useState();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [UserSelected, setUserSelected] = useState();


	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};

	useEffect(()=>{
		setUsers(getUsers);
	},[getUsers]);

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

	const newUser = () => {
		createUser([]);
	}

	const modifyUserInfo = () => {
		editUser(UserSelected,[]);
		setIsEditModalVisible(false);
	}

  return (
    <React.Fragment>
      <div className="landing-view">
				<h1>User List</h1>
				<div className="new-user">
					</div><button onClick={() => usingForm(undefined)}>Add user <PlusOutlined /></button>
				<div className="landing-view__user-list">
					{users&&users.map(user=>
						<div key={user.id} className="landing-view__user-list__user-row">
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
								<button className="delete-button" onClick={()=> deleteUser(user.id)}><DeleteOutlined /></button>
							</div>

						</div>
					)}
				</div>
				<Modal 
					title="Edit user modal" 
					visible={isEditModalVisible} 
					onOk={()=> modifyUserInfo()} 
					onCancel={()=>setIsEditModalVisible(false)}>
					
					<Form
						form = {userForm}
						{...layout}
						name="basic"
						initialValues={{ remember: true }}
						// onFinish={onFinish}
						// onFinishFailed={onFinishFailed}
					>
						<Form.Item
							label="First Name"
							name="firstname"
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Last Name"
							name="lastname"
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Email"
							name="email"
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Birth Date"
							name="birthDate"
						>
							<DatePicker onChange={(date, dateString)=> userForm.setFieldsValue(dateString ? {birthDate: moment(dateString)} : undefined)} />
						</Form.Item>

						<hr/>
						<Form.Item
							label="Street"
							name="street"
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="City"
							name="city"
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Country"
							name="country"
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Postal Code"
							name="postalcode"
						>
							<Input />
						</Form.Item>

					</Form>
				</Modal>
      </div>
    </React.Fragment>
  )

}