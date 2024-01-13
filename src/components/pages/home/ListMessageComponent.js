import React, {useEffect, useState} from 'react';
import {Avatar, Card, Flex, List, Typography} from 'antd';
import {useSearchParams} from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import InfiniteScroll from "react-infinite-scroll-component";

const {Text} = Typography;
const ContainerHeight = window.innerHeight - 228;

const ListMessageComponent = () => {
    const [data, setData] = useState({loading: false, result: [], totalItem: 0})
    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState(
        {
            channelId: "",
            content: "",
            page: 1,
            size: 20,
            loadMore: false
        })

    const token = localStorage.getItem("token")
    let sub = ""
    try {
        sub = JSON.parse(atob(token.split('.')[1])).sub
    } catch (o) {
    }

    useEffect(() => {
        if (!data.loading) {
            setData(o => ({...o, loading: true}))
            const fetchAPI = async () => {
                const response = await UseFetch(Api.channelsChannelIdMessagesGET,
                    `${searchParams.get("channelId")}/messages?content=${search.content}&page=${search.page}&size=${search.size}`
                )
                const res = await response.json();
                if (res.success) {
                    let list
                    if (!search.loadMore) {
                        list = res.data.content.sort((a, b) => a.createdAt - b.createdAt)
                    } else {
                        list = data.result.concat(res.data.content).sort((a, b) => a.createdAt - b.createdAt)
                    }
                    list = [...new Map(list.map(item => [item["id"], item])).values()];
                    setData(o => (
                        {
                            ...o,
                            loading: false,
                            result: list,
                            totalItem: res.data.totalElements
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
        }
    }, [search, searchParams]);

    const onScroll = (e) => {
        if (Math.floor(e.currentTarget.scrollHeight + e.currentTarget.scrollTop) === ContainerHeight) {
            if (data.result.length < data.totalItem) {
                e.currentTarget.scrollTop = e.currentTarget.scrollTop + 200
            }
            if (!data.loading) {
                setSearch(o => ({...o, page: search.page + 1, loadMore: true}))
            }
        }
    };

    return (
        <div
            id="scrollableDiv"
            style={{
                height: ContainerHeight,
                overflow: 'auto',
                padding: "0px 16px 0",
                display: "flex",
                flexDirection: "column-reverse",
                visibility: data.result.length > 0 ? "visible" : "hidden"
            }}
            onScroll={onScroll}
        >
            <InfiniteScroll
                dataLength={data.result.length}
                next={null}
                hasMore={null}
                loader={null}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data.result}
                    renderItem={(item) =>
                        item.sender.id !== sub
                            ? <Flex
                                key={item.id}
                                style={{
                                    margin: "8px 0"
                                }}
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
                                    margin: "8px 0"
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
                    }
                />
            </InfiniteScroll>
        </div>
    )
}
export default ListMessageComponent