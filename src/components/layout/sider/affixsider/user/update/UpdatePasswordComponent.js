import {Button, Flex, Form, Input, Modal, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {EditOutlined} from "@ant-design/icons";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";

const {Text, Link} = Typography;

const UpdatePasswordComponent = ({onChangeTab, messageApi}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState({oldPassword: "", newPassword: ""})
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
            if (password.oldPassword !== "" && password.newPassword !== "") {
                setData(o => ({...o, loading: true}))
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.uUsersPATCH, "", JSON.stringify({
                        oldPassword: password.oldPassword,
                        newPassword: password.newPassword
                    }))
                    const data = await response.json();
                    setData(o => ({...o, loading: false}))
                    if (data.success) {
                        messageApi.success("Cập nhật mật khẩu thành công")
                    } else {
                        if (data.errorCode === -8) {
                            messageApi.error("Mật khẩu cũ không đúng")
                        } else {
                            messageApi.error("Cập nhật tên thất bại")
                            localStorage.removeItem("token")
                            onChangeTab("sign-in")
                        }
                    }
                }
                fetchAPI()
            }
        },
        [password]
    )

    const onFinish = (values) => {
        setPassword({oldPassword: values.oldPassword, newPassword: values.newPassword})
    };
    const onFinishFailed = () => {
    };

    return (
        <Flex
            style={{
                marginTop: 16,
            }}
            justify="center"
        >
            <Text>Mật khẩu</Text>
            <Text> <EditOutlined onClick={showModal}/></Text>
            <Modal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >
                <Form
                    style={{
                        marginTop: 30
                    }}
                    name="basic"
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 17,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu từ 8-16 ký tự. Chứa ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 ký tự số, 1 ký tự ặc biệt',
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,16}$/
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu từ 8-16 ký tự. Chứa ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 ký tự số, 1 ký tự ặc biệt',
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,16}$/
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        dependencies={['newPassword']}
                        name="repassword"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không khớp',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24
                        }}
                    >
                        <div
                            style={{
                                margin: "0 auto",
                                width: 53
                            }}
                        >
                            <Button
                                disabled={data.loading}
                                type="primary"
                                htmlType="submit"
                            >
                                Cập nhật
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </Flex>
    )
}
export default UpdatePasswordComponent