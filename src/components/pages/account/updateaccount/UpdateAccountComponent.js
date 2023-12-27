import {Avatar, Card, Flex, Space, Typography} from "antd";
import React, {useEffect, useState} from "react";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import {UploadOutlined} from "@ant-design/icons";
import UpdatePasswordComponent from "./UpdatePasswordComponent";

const {Paragraph, Text} = Typography;
const UpdateAccountComponent = ({onChangeTab}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [updateUser, setUpdateUser] = useState({avatar: "", name: "", newPassword: "", oldPassword: ""})

    useEffect(() => {
            setData(o => ({...o, loading: true}))
            const fetchAPI = async () => {
                const response = await UseFetch(Api.uUsersGET)
                const data = await response.json();
                if (data.success) {
                    setData(o => ({...o, loading: false, result: data.data}))
                } else {
                    localStorage.removeItem("token")
                    onChangeTab("sign-in")
                }
            }
            fetchAPI()
        }, []
    )

    const onChangeName = (value) => {
        setUpdateUser(o => ({...o, name: value}))
    }

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

                <Flex justify="center">
                    <Avatar
                        style={{
                            width: 150,
                            height: 150,
                            border: "1px solid DarkGrey"
                        }}
                        src={data.result && data.result.local.avatar || `https://xsgames.co/randomusers/avatar.php?g=pixel&key=2`}
                    />
                    <Space align={"end"}>
                        <UploadOutlined/>
                    </Space>
                </Flex>
                <Flex
                    justify="center"
                    style={{
                        marginTop: 16,
                        marginBottom: 5
                    }}
                >
                    <Text>{data.result && data.result.local.email}</Text>
                </Flex>
                <Flex
                    justify="center"
                >
                    <Paragraph
                        editable={{
                            onChange: onChangeName,
                        }}
                    >
                        {data.result && data.result.local.name}
                    </Paragraph>
                </Flex>
                <Flex
                    justify="center"
                >
                    <UpdatePasswordComponent/>
                </Flex>
            </Card>
        </Flex>
    )
}
export default UpdateAccountComponent