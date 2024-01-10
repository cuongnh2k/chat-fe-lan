import React, {useEffect, useState} from 'react';
import VirtualList from 'rc-virtual-list';
import {Avatar, List} from 'antd';
import Api from "../../../api/Api";
import UseFetch from "../../../hooks/UseFetch";
import {useNavigate} from "react-router-dom";

const ContainerHeight = window.innerHeight - 198;

const ListCurrentChannelComponent = () => {
    const [data, setData] = useState({loading: false, result: []})
    const [search, setSearch] = useState({type: "", search: "", status: "", page: 1, size: 10})
    const navigate = useNavigate();

    useEffect(() => {
        setData(o => ({...o, loading: true}))
        const fetchAPI = async () => {
            const response = await UseFetch(Api.channelsGET,
                `?type=${search.type}&search=${search.search}&status=${search.status}&page=${search.page}&size=${search.size}`
            )
            const data = await response.json();
            setData(o => ({...o, loading: false}))
            if (data.success) {
                // let filter = data.result.filter(o=>)
                setData(o => (
                    {
                        ...o,
                        result: o.result.concat(data.data.content).sort((a, b) => b.createdAt - a.createdAt)
                    }
                ))
            } else {
                localStorage.removeItem("token")
                navigate("/account")
            }
        }
        fetchAPI()
    }, [search])

    const onScroll = (e) => {
        if (Math.floor(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) <= ContainerHeight) {
            setSearch(o => ({...o, page: o.page + 1}))
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
                            paddingRight: 16
                        }}
                        key={item.id}
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
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.currentMessage && item.currentMessage.content}
                        />
                        {/*<div>Content</div>*/}
                    </List.Item>
                )}
            </VirtualList>
        </List>
    )
}
export default ListCurrentChannelComponent