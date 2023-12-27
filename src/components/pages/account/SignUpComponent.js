import React, {useEffect, useState} from 'react';
import {Button, Card, Flex, Form, Input} from 'antd';
import TabComponent from "../../common/TabComponent";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";

const SignUpComponent = ({account, onChangeTab, messageApi, onSignUp}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [signUp, setLogUp] = useState({name: "", email: "", password: ""})

    useEffect(() => {
            if (signUp.name !== "" && signUp.email !== "" && signUp.password !== "") {
                setData(o => ({...o, loading: true}))
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.bAuthsSignUpPOST,
                        "",
                        JSON.stringify({
                            name: signUp.name,
                            email: signUp.email,
                            password: signUp.password
                        }))
                    const data = await response.json();
                    setData(o => ({...o, loading: false}))
                    if (data.success) {
                        messageApi.open({
                            type: 'success',
                            content: "Đăng ký thành công. Vui lòng kích hoạt tài khoản",
                            duration: 3,
                        });
                        onSignUp(signUp.email)
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: 'Email đã tồn tại',
                            duration: 1,
                        });
                    }
                }
                fetchAPI()
            }
        }, [signUp]
    )

    const onFinish = (values) => {
        setLogUp({name: values.name, email: values.email, password: values.password})
    };
    const onFinishFailed = () => {
    };
    return (
        <Flex
            justify="center"
        >
            <Card
                style={{
                    width: "100%",
                    maxWidth: 500,
                }}
            >
                <TabComponent onChangeTab={onChangeTab} activeKey={account.activeKey}/>
                <Form
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
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Tên từ 1-50 ký tự',
                                pattern: /^.{1,50}$/
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đúng định dạng email',
                                type: "email"
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
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
                        dependencies={['password']}
                        name="repassword"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không khớp',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <div
                        onClick={o => onChangeTab("reset-password")}
                        style={{
                            margin: "0 auto",
                            width: 96,
                            marginBottom: 10
                        }}
                    >
                        Quên mật khẩu
                    </div>
                    <div
                        onClick={o => onChangeTab("active-account")}
                        style={{
                            margin: "0 auto",
                            width: 120,
                            marginBottom: 20
                        }}
                    >
                        Kích hoạt tài khoản
                    </div>
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
                                Gửi
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    )
}
export default SignUpComponent