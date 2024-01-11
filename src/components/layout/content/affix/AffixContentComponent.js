import {Affix, Avatar, Divider, List} from "antd";
import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

const AffixContentComponent = ({clickCollapsed, collapsed}) => {
    return (
        <Affix
            offsetTop={0}
        >
            {collapsed
                ? <MenuUnfoldOutlined
                    style={{
                        fontSize: 24,
                    }}
                    onClick={() => clickCollapsed()}
                />
                : <MenuFoldOutlined
                    style={{
                        fontSize: 24,
                    }}
                    onClick={() => clickCollapsed()}
                />
            }
            <List
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
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
                            title={item.title}
                            description="Ant Desim"
                        />
                    </List.Item>
                )}
            />
            <Divider
                style={{
                    margin: 0,
                }}
            />
        </Affix>
    )
}
export default AffixContentComponent