import React, {useEffect, useState} from 'react';
import {Avatar, Card, Flex, Image, List, Typography} from 'antd';
import {useSearchParams} from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import InfiniteScroll from "react-infinite-scroll-component";
import SockJS from "sockjs-client";
import {over} from "stompjs";

const {Text} = Typography;
const ContainerHeight = window.innerHeight - 238;

const ListMessageComponent = () => {
    let stompClient = null;
    const [data, setData] = useState({loading: false, result: [], totalItem: 0})
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState({content: "", size: 1000,})
    const [notify, setNotify] = useState(null)

    const token = localStorage.getItem("token")
    let sub = ""
    try {
        sub = JSON.parse(atob(token.split('.')[1])).sub
    } catch (o) {
    }

    const connect = () => {
        let Sock = new SockJS(`${process.env.REACT_APP_HOST}/wsjs?token=${token}`);
        stompClient = over(Sock);
        stompClient.connect({},
            () => {
                stompClient.subscribe('/user/' + sub + '/private', (payload) => {
                    let res = payload.body;
                    setNotify(res)
                });
            },
            (err) => {
                console.log(err);
            }
        );
    }
    connect()

    useEffect(() => {
        if (notify !== null) {
            let list = data.result;
            list.push(JSON.parse(notify).currentMessage);
            list.sort((a, b) => a.createdAt - b.createdAt)
            list = [...new Map(list.map(item => [item["id"], item])).values()];
            console.log(list)
            setData(o => (
                {
                    ...o,
                    result: list
                }
            ))
        }
    }, [notify])

    useEffect(() => {
        // setInterval(() => {
        // this code runs every second
        if (!data.loading) {
            setData(o => ({...o, loading: true}))
            const fetchAPI = async () => {
                const response = await UseFetch(Api.channelsChannelIdMessagesGET,
                    `${searchParams.get("channelId")}/messages?content=${search.content}&page=${searchParams.get("page")}&size=${search.size}`
                )
                const res = await response.json();
                if (res.success) {
                    let list
                    if (searchParams.get("loadMore") === "false") {
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
        // }, 1000);
    }, [search, searchParams]);

    const onScroll = (e) => {
        if (Math.floor(e.currentTarget.scrollHeight + e.currentTarget.scrollTop) === ContainerHeight) {
            if (data.result.length < data.totalItem) {
                e.currentTarget.scrollTop = e.currentTarget.scrollTop + 200
            }
            if (!data.loading) {
                setSearchParams(o => (
                    {
                        channelId: searchParams.get("channelId"),
                        page: Number(searchParams.get("page")) + 1,
                        loadMore: true
                    }
                ))
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
                                    {item.files.map(o => {
                                        return o.contentType.startsWith("image")
                                            ? <Image src={o.url}/>
                                            : (o.contentType.startsWith("video")
                                                    ? <video width={632} height={632} controls>
                                                        <source src={o.url} type={o.contentType}/>
                                                    </video>
                                                    : (o.contentType.startsWith("audio")
                                                            ? <audio controls>
                                                                <source src={o.url} type={o.contentType}/>
                                                            </audio>
                                                            : (o.contentType === 'application/pdf' || o.contentType === 'text/html' || o.contentType === 'text/htm'
                                                                    ? <iframe width={632} height={632} src={o.url}/>
                                                                    : <a style={{color: "red"}} href={o.url} target="_blank">{o.name}</a>
                                                            )
                                                    )
                                            )
                                    })
                                    }
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
                                    {item.files.map(o => {
                                        return o.contentType.startsWith("image")
                                            ? <Image src={o.url}/>
                                            : (o.contentType.startsWith("video")
                                                    ? <video width={632} height={632} controls>
                                                        <source src={o.url} type={o.contentType}/>
                                                    </video>
                                                    : (o.contentType.startsWith("audio")
                                                            ? <audio controls>
                                                                <source src={o.url} type={o.contentType}/>
                                                            </audio>
                                                            : (o.contentType === 'application/pdf' || o.contentType === 'text/html' || o.contentType === 'text/htm'
                                                                    ? <iframe width={632} height={632} src={o.url}/>
                                                                    : <a style={{color: "red"}} href={o.url} target="_blank">{o.name}</a>
                                                            )
                                                    )
                                            )
                                    })
                                    }
                                </Card>
                            </Flex>
                    }
                />
            </InfiniteScroll>
        </div>
    )
}
export default ListMessageComponent