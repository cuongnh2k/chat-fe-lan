import {Affix, Avatar, Divider, List} from "antd";
import React, {useEffect, useState} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useSearchParams} from "react-router-dom";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";

const AffixContentComponent = ({clickCollapsed, collapsed}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [searchParams] = useSearchParams()
    useEffect(() => {
        setData(o => ({...o, loading: true}))
        const fetchAPI = async () => {
            const response = await UseFetch(Api.channelsChannelIdGET,
                `/${searchParams.get("channelId")}`
            )
            const res = await response.json();
            if (res.success) {
                setData(o => (
                    {
                        ...o,
                        result: res.data
                    }
                ))
            }
        }
        fetchAPI()
    }, [searchParams])

    return (
        <Affix
            style={{
                height: 97
            }}
            offsetTop={0}
        >
            <div>
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
                            name: data.result && data.result.name,
                            avatarUrl: data.result && data.result.avatarUrl
                        },
                    ]}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={data.result
                                    ? <Avatar
                                        style={{
                                            width: 48,
                                            height: 48,
                                        }}
                                        src={item.avatarUrl}
                                    />
                                    : null
                                }
                                title={item.name}
                                description={data.result && `Đang hoạt động`}
                            />
                        </List.Item>
                    )}
                />
                <Divider
                    style={{
                        margin: 0,
                        display: "none"
                    }}
                />
            </div>
        </Affix>
    )
}
export default AffixContentComponent