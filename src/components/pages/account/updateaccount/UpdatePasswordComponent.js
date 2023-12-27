import {Button, Form, Input} from "antd";
import React from "react";

const UpdatePasswordComponent = () => {
    const onFinish = (values) => {
        console.log("ok")
    };
    const onFinishFailed = () => {
        console.log("fail")
    };
    return (
        <Form
            style={{
                maxWidth: 300,
                width: "100%"
            }}
            name="basic"
            wrapperCol={{
                span: 24,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="oldPassword"
                rules={[
                    {
                        message: 'Mật khẩu từ 8-16 ký tự. Chứa ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 ký tự số, 1 ký tự ặc biệt',
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,16}$/
                    },
                ]}
            >
                <Input.Password placeholder="Mật khẩu cũ"/>
            </Form.Item>

            <Form.Item
                name="newPassword"
                rules={[
                    {
                        message: 'Mật khẩu từ 8-16 ký tự. Chứa ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 ký tự số, 1 ký tự ặc biệt',
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,16}$/
                    },
                ]}
            >
                <Input.Password placeholder="Mật khẩu mới"/>
            </Form.Item>
            <Form.Item
                dependencies={['newPassword']}
                name="repassword"
                rules={[
                    {
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
                <Input.Password placeholder="Nhập lại mật khẩu"/>
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
                        // disabled={data.loading}
                        type="primary"
                        htmlType="submit"
                    >
                        Gửi
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}
export default UpdatePasswordComponent