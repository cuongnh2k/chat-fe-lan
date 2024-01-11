import {Avatar, List, Typography} from "antd";
import React, {useEffect, useState} from "react";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import {useNavigate} from "react-router-dom";

const {Text} = Typography;
const UserSiderComponent = () => {
    const [data, setData] = useState({loading: false, result: null})
    const navigate = useNavigate();
    useEffect(() => {
        setData(o => ({...o, loading: true}))
        const fetchAPI = async () => {
            const response = await UseFetch(Api.usersGET,)
            const res = await response.json();
            if (res.success) {
                setData(o => ({...o, result: res.data}))
            } else {
                localStorage.removeItem("token")
                navigate("/account")
            }
        }
        fetchAPI()
    }, [])
    return (
        <List
            style={{
                width: "100%"
            }}
            itemLayout="horizontal"
            dataSource={[
                {
                    title: data.result && data.result.name,
                },
            ]}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                style={{
                                    width: 48,
                                    height: 48,
                                }}
                                src={data.result && data.result.avatarUrl}
                            />
                        }
                        title={
                            <Text
                                style={{
                                    width: 200,
                                }}
                                ellipsis={{
                                    tooltip: data.result && data.result.name
                                }}
                            >
                                {item.title}
                            </Text>
                        }
                        description="Đang hoạt động"
                    />
                </List.Item>
            )}
        />
    )
}
export default UserSiderComponent