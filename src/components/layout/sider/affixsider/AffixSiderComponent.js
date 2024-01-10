import {Affix, Avatar, Flex, Input, List, Tabs} from "antd";
import React from "react";
import {EllipsisOutlined, SearchOutlined} from "@ant-design/icons";
import AddFriendComponent from "./AddFriendComponent";
import AddGroupComponent from "./AddGroupComponent";

const AffixContentComponent = ({collapsed}) => {
    return (
        <Affix
            style={{
                display: collapsed ? "none" : "inline"
            }}
            offsetTop={0}
        >
            <Flex
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                }}
                justify={"flex-end"}
            >
                <EllipsisOutlined
                    style={{
                        fontSize: 24,
                        cursor: "pointer"
                    }}
                />
            </Flex>
            <Flex
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                }}
            >
                <List
                    style={{
                        width: "100%"
                    }}
                    itemLayout="horizontal"
                    dataSource={[
                        {
                            title: 'Ant Design Title 1',
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
                                        src={`https://randomuser.me/api/portraits/men/48.jpg`}
                                    />
                                }
                                title={`Nguyễn Hữu Cường`}
                                // description="Ant Design, a design language"
                            />
                        </List.Item>
                    )}
                />
                <AddFriendComponent/>
                <AddGroupComponent/>
            </Flex>

            <Flex
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                }}
            >
                <Input
                    size={"large"}
                    placeholder="default size"
                    prefix={<SearchOutlined/>}
                />
            </Flex>

            <Tabs
                style={
                    {
                        paddingLeft: 16,
                        paddingRight: 16,
                    }}
                defaultActiveKey="1"
                items={[
                    {
                        label: `Tất cả`,
                        key: `Tất cả`,
                    },
                    {
                        label: `Bạn bè`,
                        key: `Bạn bè`,
                    },
                    {
                        label: `Nhóm`,
                        key: `Nhóm`,
                    },
                ]}
            />
        </Affix>
    )
}
export default AffixContentComponent