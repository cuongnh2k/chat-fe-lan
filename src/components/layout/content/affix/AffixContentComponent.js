import {Affix, Avatar, Flex, List, message, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useSearchParams} from "react-router-dom";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import SearchComponent from "./SearchComponent";
import AddMemberComponent from "./AddMemberComponent";
import InfoComponent from "./InfoComponent";

const {Text} = Typography;

const AffixContentComponent = ({clickCollapsed, collapsed}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [searchParams] = useSearchParams()
    const [messageApi, contextHolder] = message.useMessage()

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
            <div
                style={{
                    visibility: data.result !== null ? "visible" : "hidden"
                }}
            >
                {contextHolder}
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
                <Flex
                    style={{
                        paddingLeft: 16,
                        paddingRight: 16
                    }}
                >
                    <List
                        style={{
                            width: "100%"
                        }}
                        itemLayout="horizontal"
                        dataSource={[
                            {
                                name: data.result && data.result.name,
                                avatarUrl: data.result && data.result.avatarUrl,
                                email: data.result && data.result.email,
                                type: data.result && data.result.type
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
                                        >
                                            {item.type === "FRIEND" ? item.email : ""}
                                        </Text>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                    <SearchComponent/>
                    {data.result && data.result.type === "GROUP"
                        ? <AddMemberComponent messageApi={messageApi}/>
                        : ""
                    }
                    <InfoComponent data={data}/>
                </Flex>
            </div>
        </Affix>
    )
}
export default AffixContentComponent