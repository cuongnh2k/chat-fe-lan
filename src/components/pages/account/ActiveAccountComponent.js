import React, {useEffect, useState} from "react";
import {Button, Card, Flex, Form, Input} from "antd";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import TabComponent from "../../common/TabComponent";

const ActiveAccountComponent = ({onChangeTab, onActiveAccount, account, messageApi}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [activeAccount, setActiveAccount] = useState({email: "", verifyToken: ""})

    useEffect(() => {
            if (activeAccount.email !== "" && activeAccount.verifyToken !== "") {
                setData(o => ({...o, loading: true}))
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.bAuthsActivePOST,
                        "",
                        JSON.stringify({
                            email: activeAccount.email,
                            verifyToken: activeAccount.verifyToken
                        }))
                    const data = await response.json();
                    setData(o => ({...o, loading: false}))
                    if (data.success) {
                        messageApi.open({
                            type: 'success',
                            content: 'Kích hoạt tài khoản thành công',
                            duration: 3,
                        });
                        onActiveAccount(activeAccount.email)
                    } else {
                        if (data.errorCode === -5) {
                            messageApi.open({
                                type: 'error',
                                content: 'Email không tồn tại',
                                duration: 1,
                            });
                        } else if (data.errorCode === -6) {
                            messageApi.open({
                                type: 'error',
                                content: 'Mã kích hoạt không đúng',
                                duration: 1,
                            });
                        }
                    }
                }
                fetchAPI()
            }
        }, [activeAccount]
    )

    const onFinish = (values) => {
        setActiveAccount({email: values.email, verifyToken: values.verifyToken})
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
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
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
                        initialValue={account.signUpEmail === "" ? account.signInActiveAccountEmail : account.signUpEmail}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Mã kích hoạt"
                        name="verifyToken"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đúng định dạng mã kích hoạt',
                                pattern: /^\d{4}$/
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
                            marginBottom: 20
                        }}
                    >
                        Quên mật khẩu
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
export default ActiveAccountComponent