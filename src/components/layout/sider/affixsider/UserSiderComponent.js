import {Avatar, List, Typography} from "antd";
import React, {useEffect, useState} from "react";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import {useNavigate} from "react-router-dom";
import UpdateUserComponent from "./UpdateUserComponent";

const {Text} = Typography;
const UserSiderComponent = () => {
    const [data, setData] = useState({loading: false, result: null})
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <List
            style={{
                width: "100%"
            }}
            itemLayout="horizontal"
            dataSource={[
                {
                    name: data.result && data.result.name,
                    avatarUrl: data.result && data.result.avatarUrl
                },
            ]}
            renderItem={(item, index) => (
                <List.Item
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={showModal}
                >
                    <UpdateUserComponent isModalOpen={isModalOpen} closeModal={closeModal}/>
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                style={{
                                    width: 48,
                                    height: 48,
                                }}
                                src={item.avatarUrl}
                            />
                        }
                        title={
                            <Text
                                style={{
                                    width: 200,
                                }}
                                ellipsis={{
                                    tooltip: item.name
                                }}
                            >
                                {item.name}
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