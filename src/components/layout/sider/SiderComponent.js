import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import ListCurrentChannelComponent from "./ListCurrentChannelComponent";
import AffixSiderComponent from "./affixsider/AffixSiderComponent";
import {useNavigate} from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";

const {Sider} = Layout;

const SiderComponent = ({responseCollapsed, collapsed}) => {
    const [data, setData] = useState({loading: false, result: []})
    const [search, setSearch] = useState({
        type: "",
        search: "",
        status: "ACCEPT",
        page: 1,
        size: 20,
        loadMore: false
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (!data.loading) {
            setData(o => ({...o, loading: true}))
            const fetchAPI = async () => {
                const response = await UseFetch(Api.channelsGET,
                    `?type=${search.type}&search=${search.search}&status=${search.status}&page=${search.page}&size=${search.size}`
                )
                const res = await response.json();
                if (res.success) {
                    let list
                    if (!search.loadMore) {
                        list = res.data.content.sort((a, b) => {
                                if (a.currentMessage && b.currentMessage) {
                                    return b.currentMessage.createdAt - a.currentMessage.createdAt
                                }
                                if (a.currentMessage) {
                                    return b.createdAt - a.currentMessage.createdAt
                                }
                                if (b.currentMessage) {
                                    return b.currentMessage.createdAt - a.createdAt
                                }
                                return b.createdAt - a.createdAt
                            }
                        )
                    } else {
                        list = data.result.concat(res.data.content).sort((a, b) => {
                            if (a.currentMessage && b.currentMessage) {
                                return b.currentMessage.createdAt - a.currentMessage.createdAt
                            }
                            if (a.currentMessage) {
                                return b.createdAt - a.currentMessage.createdAt
                            }
                            if (b.currentMessage) {
                                return b.currentMessage.createdAt - a.createdAt
                            }
                            return b.createdAt - a.createdAt
                        })
                        list = [...new Map(list.map(item => [item["id"], item])).values()];
                    }
                    setData(o => (
                        {
                            ...o,
                            loading: false,
                            result: list
                        }
                    ))
                } else {
                    localStorage.removeItem("token")
                    navigate("/account")
                }
            }
            fetchAPI()
        }
    }, [search])

    const onChangeSearch = (value) => {
        setSearch(o => ({...o, search: value, page: 1, loadMore: false}))
    }

    const onChangeType = (value) => {
        setSearch(o => ({...o, type: value, page: 1, loadMore: false}))
    }

    const onChangePage = (value) => {
        setSearch(o => ({...o, page: value, loadMore: true}))
    }
    return (
        <Sider
            style={{
                height: window.innerHeight,
                border: "1px solid LightGrey",

            }}
            breakpoint="md"
            collapsedWidth="1"
            onBreakpoint={(broken) => {
            }}
            onCollapse={(collapsed, type) => {
                responseCollapsed(collapsed)
            }}
            collapsed={collapsed}
            width={300}
            theme={"light"}
        >
            <AffixSiderComponent onChangeType={onChangeType} onChangeSearch={onChangeSearch} collapsed={collapsed}/>
            <ListCurrentChannelComponent onChangePage={onChangePage} search={search} data={data} collapsed={collapsed}/>
        </Sider>
    )
}
export default SiderComponent