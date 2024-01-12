import {Button, Flex, Form, Input, Modal, Typography} from "antd";
import React, {useState} from "react";
import {EditOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import UseFetch from "../../../../../../hooks/UseFetch";
import Api from "../../../../../../api/Api";

const {Text} = Typography;

const UpdateNameComponent = ({onRefresh, data, messageApi}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = (values) => {
        const fetchAPI = async () => {
            const response = await UseFetch(Api.usersPATCH,
                "",
                JSON.stringify({name: values.name})
            )
            const data = await response.json();
            if (data.success) {
                messageApi.open({
                    type: 'success',
                    content: 'Cập nhật tên thành công',
                    duration: 3,
                });
                onRefresh()
            } else {
                localStorage.removeItem("token")
                navigate("/account")
            }
        }
        fetchAPI()
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
            <Text>{data.result && data.result.name} <EditOutlined onClick={showModal}/></Text>
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
                        span: 0,
                    }}
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
                        wrapperCol={{
                            offset: 2,
                            span: 20
                        }}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Tên từ 1-50 ký tự.',
                                pattern: /^.{1,50}$/
                            },
                        ]}
                        initialValue={data.result && data.result.name}
                    >
                        <Input/>
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
export default UpdateNameComponent