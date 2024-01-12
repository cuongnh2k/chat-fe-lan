import {Button, Flex, Form, Input, Modal, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {EditOutlined} from "@ant-design/icons";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";

const {Text, Link} = Typography;

const UpdateNameComponent = ({onChangeTab, data, messageApi}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
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
            if (name !== "") {
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.uUsersPATCH, "", JSON.stringify({name: name}))
                    const data = await response.json();
                    if (data.success) {
                        messageApi.success("Cập nhật tên thành công")
                    } else {
                        messageApi.error("Cập nhật tên thất bại")
                        localStorage.removeItem("token")
                        onChangeTab("sign-in")
                    }
                }
                fetchAPI()
            }
        },
        [name]
    )

    const onFinish = (values) => {
        setName(values.name)
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
            <Text>{name === "" ? (data.result && data.result.local.name) : name} </Text>
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
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 22,
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
                                message: 'Vui lòng nhập tên',
                            },
                        ]}
                        initialValue={data.result && data.result.local.name}
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