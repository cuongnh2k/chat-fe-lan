import React, {useEffect, useState} from 'react';
import VirtualList from 'rc-virtual-list';
import {Avatar, Card, Flex, List, Typography} from 'antd';
import {useSearchParams} from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";

const {Text} = Typography;

const ContainerHeight = window.innerHeight - 228;
const ListMessageComponent = () => {
    const [data, setData] = useState({loading: false, result: []})
    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState(
        {
            channelId: searchParams.get("channelId"),
            content: "",
            page: 1,
            size: 100
        })

    const token = localStorage.getItem("token")
    let sub = ""
    try {
        sub = JSON.parse(atob(token.split('.')[1])).sub
    } catch (o) {
    }

    useEffect(() => {
        setData(o => ({...o, loading: true}))
        const fetchAPI = async () => {
            const response = await UseFetch(Api.channelsChannelIdMessagesGET,
                `${search.channelId}/messages?content=${search.content}&page=${search.page}&size=${search.size}`
            )
            const res = await response.json();
            if (res.success) {
                let list
                // if (!search.loadMore) {
                    list = res.data.content.sort((a, b) => b.createdAt - a.createdAt)
                // } else {
                //     list = data.result.concat(res.data.content).sort((a, b) => a.createdAt - b.createdAt)
                // }
                // list = [...new Map(list.map(item => [item["id"], item])).values()];
                // list.sort((a, b) => b.createdAt - a.createdAt)
                setData(o => (
                    {
                        ...o,
                        loading: false,
                        result: list
                    }
                ))
            } else {
                setData(o => (
                    {
                        ...o,
                        loading: false,
                        result: []
                    }
                ))
            }
        }
        fetchAPI()
    }, [search]);

    const onScroll = (e) => {
        if (Math.floor(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) <= ContainerHeight) {
            // setSearch(search.page + 1)
        }
    };
    window.scrollTo(0, document.body.scrollHeight);
    return (
        <List>
            <VirtualList
                style={{
                    overflowAnchor: "auto"
                }}
                data={data.result}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
                direction="ltr"
            >
                {(item, index) => (
                    item.sender.id !== sub
                        ? <Flex
                            key={item.id}
                            style={{
                                margin: "8px 16px 8px 16px"
                            }}
                            // justify={"flex-start"}
                        >
                            <Avatar
                                style={{
                                    minWidth: 48,
                                    height: 48,
                                    marginRight: 16
                                }}
                                src={item.sender.avatarUrl}
                            />
                            <Card
                                style={{
                                    maxWidth: 600,
                                }}
                                size="small"
                                bordered={false}
                            >
                                <Text>
                                    {item.content}
                                </Text>
                            </Card>
                        </Flex>
                        : <Flex
                            key={item.id}
                            style={{
                                margin: "8px 16px 8px 16px"
                            }}
                            justify={"flex-end"}
                        >
                            <Card
                                style={{
                                    maxWidth: 664,
                                }}
                                size="small"
                                bordered={false}
                            >
                                <Text>
                                    {item.content}
                                </Text>
                            </Card>
                        </Flex>
                )}
            </VirtualList>
        </List>
    )
}
export default ListMessageComponent