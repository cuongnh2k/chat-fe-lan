import {Affix, Avatar, Flex, List, Typography} from "antd";
import React from "react";
import {EllipsisOutlined} from "@ant-design/icons";
import AddFriendComponent from "./AddFriendComponent";
import AddGroupComponent from "./AddGroupComponent";
import SearchSiderComponent from "./SearchSiderComponent";
import TabSiderComponent from "./TabSiderComponent";

const {Text} = Typography;
const AffixContentComponent = ({onChangeType, onChangeSearch, collapsed}) => {

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
                                title={
                                    <Text
                                        style={{
                                            width: 200,
                                        }}
                                        ellipsis={{
                                            tooltip: 'Ant Design, a design language for background applications, is refined by Ant UED\n'
                                        }}
                                    >
                                        Ant Design, a design language for background applications, is refined by Ant UED
                                        Team.
                                    </Text>
                                }
                                // description="Ant Design, a design language"
                            />
                        </List.Item>
                    )}
                />
                <AddFriendComponent/>
                <AddGroupComponent/>
            </Flex>
            <SearchSiderComponent onChangeSearch={onChangeSearch}/>
            <TabSiderComponent onChangeType={onChangeType}/>
        </Affix>
    )
}
export default AffixContentComponent