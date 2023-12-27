import React, {useEffect, useState} from 'react';
import {Button, Card, Flex, Form, Input} from 'antd';
import TabComponent from "../../common/TabComponent";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";

const ResetPasswordComponent = ({onChangeTab, onResetPassword, account, messageApi}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [resetPassword, setResetPassword] = useState({email: ""})

    useEffect(() => {
            if (resetPassword.email !== "") {
                setData(o => ({...o, loading: true}))
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.bAuthsResetPasswordPOST,
                        "",
                        JSON.stringify({
                            email: resetPassword.email,
                        }))
                    const data = await response.json();
                    setData(o => ({...o, loading: false}))
                    if (data.success) {
                        messageApi.open({
                            type: 'success',
                            content: 'Mật khẩu mới đã được gửi về email của bạn',
                            duration: 3,
                        });
                        onResetPassword(resetPassword.email)
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: 'Email không tồn tại',
                            duration: 1,
                        });
                    }
                }
                fetchAPI()
            }
        }, [resetPassword]
    )

    const onFinish = (values) => {
        setResetPassword({email: values.email})
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
                    >
                        <Input/>
                    </Form.Item>
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
export default ResetPasswordComponent