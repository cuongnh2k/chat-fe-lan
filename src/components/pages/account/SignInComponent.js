import React, {useEffect, useState} from 'react'
import {Button, Card, Flex, Form, Input} from 'antd'
import TabComponent from "../../common/TabComponent"
import UseFetch from "../../../hooks/UseFetch"
import Api from "../../../api/Api"

const SignInComponent = ({account, onChangeTab, onSignIn, onSignInActiveAccount, messageApi}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [signIn, setSignIn] = useState({email: "", password: ""})

    useEffect(() => {
            if (signIn.email !== "" && signIn.password !== "") {
                setData(o => ({...o, loading: true}))
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.bAuthsSignInPOST,
                        "",
                        JSON.stringify({
                            email: signIn.email,
                            password: signIn.password
                        }))
                    const data = await response.json();
                    setData(o => ({...o, loading: false}))
                    if (data.success) {
                        localStorage.setItem("token", `Bearer ${data.data.token}`)
                        messageApi.open({
                            type: 'success',
                            content: 'Đăng nhập thành công',
                            duration: 3,
                        });
                        onSignIn(true)
                    } else {
                        if (data.errorCode === -2) {
                            messageApi.open({
                                type: 'error',
                                content: 'Email không tồn tại',
                                duration: 1,
                            });
                        } else if (data.errorCode === -3) {
                            messageApi.open({
                                type: 'error',
                                content: 'Mật khẩu không đúng',
                                duration: 1,
                            });
                        } else if (data.errorCode === -4) {
                            messageApi.open({
                                type: 'error',
                                content: 'Tài khoản chưa kích hoạt',
                                duration: 1,
                            });
                            onSignInActiveAccount(signIn.email)
                        }
                    }
                }
                fetchAPI()
            }
        }, [signIn]
    )

    const onFinish = (values) => {
        setSignIn({email: values.email, password: values.password})
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
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
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
                        initialValue={account.activeAccountEmail === "" ? account.resetPasswordEmail : account.activeAccountEmail}
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
export default SignInComponent