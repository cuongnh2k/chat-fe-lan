import React, {useEffect, useState} from "react";
import {Avatar, List, Modal, Typography} from "antd";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import {useNavigate, useSearchParams} from "react-router-dom";

const {Text} = Typography;
const ListMemberComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({loading: false, result: null})
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (isModalOpen === true) {
            setData(o => ({...o, loading: true}))
            const fetchAPI = async () => {
                const response = await UseFetch(Api.channelsChannelIdMemberGET,
                    `${searchParams.get("channelId")}/member`)
                const res = await response.json();
                if (res.success) {
                    setData(o => ({...o, loading: false, result: res.data}))
                } else {
                    localStorage.removeItem("token")
                    navigate("/account")
                }
            }
            fetchAPI()
        }
    }, [searchParams, isModalOpen])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Text
                onClick={showModal}
            >
                Thành viên
            </Text>
            <Modal
                title="Thành viên"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={data.result ? data.result.content : []}
                    renderItem={(item, index) => (
                        <List.Item>
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
                                description={
                                    <Text
                                        style={{
                                            width: 200,
                                            color: "black"
                                        }}
                                        ellipsis={{
                                            tooltip: item.email
                                        }}
                                    >
                                        {item.email}
                                    </Text>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    )
}
export default ListMemberComponent