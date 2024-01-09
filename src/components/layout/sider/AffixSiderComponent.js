import {Affix, Avatar, Flex, List, Tabs} from "antd";
import React from "react";
import {EllipsisOutlined, UserAddOutlined, UsergroupAddOutlined} from "@ant-design/icons";

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
                <UserAddOutlined
                    style={{
                        fontSize: 16,
                        paddingLeft: 16,
                        paddingRight: 8,
                        cursor: "pointer"
                    }}
                />
                <UsergroupAddOutlined
                    style={{
                        fontSize: 16,
                        paddingLeft: 8,
                        cursor: "pointer"
                    }}
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
                        key: 1,
                    },
                    {
                        label: `Chưa đọc`,
                        key: 2,
                    },
                ]}
            />
        </Affix>
    )
}
export default AffixContentComponent