import React from 'react';
import VirtualList from 'rc-virtual-list';
import {Avatar, List, Typography} from 'antd';
import {useSearchParams} from "react-router-dom";

const {Text} = Typography;

const ContainerHeight = window.innerHeight - 198;

const ListCurrentChannelComponent = ({onChangePage, search, data}) => {
    const [, setSearchParams] = useSearchParams()
    const onScroll = (e) => {
        if (Math.floor(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) <= ContainerHeight) {
            onChangePage(search.page + 1)
        }
    };

    return (
        <List>
            <VirtualList
                data={data.result}
                height={ContainerHeight}
                itemHeight={48}
                itemKey="email"
                onScroll={onScroll}
            >
                {(item) => (
                    <List.Item
                        style={{
                            paddingLeft: 16,
                            paddingRight: 16,
                            cursor: "pointer"
                        }}
                        key={item.id}
                        onClick={() => setSearchParams({channelId: item.id})}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    style={{
                                        width: 48,
                                        height: 48
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
                                    }}
                                    ellipsis={{
                                        tooltip: item.currentMessage && item.currentMessage.content
                                    }}
                                >
                                    {item.currentMessage && item.currentMessage.content}
                                </Text>
                            }
                        />
                        {/*<div>Content</div>*/}
                    </List.Item>
                )}
            </VirtualList>
        </List>
    )
}
export default ListCurrentChannelComponent