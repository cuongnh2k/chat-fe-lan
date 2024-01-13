import {Affix, Divider, Flex, Input, Upload} from "antd";
import React, {useState} from "react";
import {FrownOutlined, SendOutlined, UploadOutlined} from "@ant-design/icons";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import {useNavigate, useSearchParams} from "react-router-dom";

const {TextArea} = Input;
const SendMessageComponent = () => {
    const [data, setData] = useState({loading: false})
    const [message, setMessage] = useState({content: ""})
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const send = () => {
        if (message.content !== "") {
            setData(o => ({...o, loading: true}))
            const fetchAPI = async () => {
                const response = await UseFetch(Api.channelsChannelIdMessagesPOST,
                    `${searchParams.get("channelId")}/messages`,
                    JSON.stringify({content: message.content})
                )
                const res = await response.json();
                if (res.success) {
                    setData(o => ({...o, loading: false,}))
                } else {
                    localStorage.removeItem("token")
                    navigate("/account")
                }
            }
            fetchAPI()
        }
    }

    return (
        <Affix
            offsetBottom={0}
        >
            <Flex
                vertical={true}
                style={{
                    background: "white",
                }}
            >
                <Flex
                    style={{
                        paddingTop: 5,
                        paddingLeft: 16,
                        paddingRight: 16
                    }}
                >
                    <Upload>
                        <UploadOutlined
                            style={{
                                cursor: "pointer",
                                fontSize: 24,
                            }}
                        />
                    </Upload>
                    <FrownOutlined
                        style={{
                            fontSize: 24,
                            marginLeft: 16,
                            marginTop: -5,
                            cursor: "pointer"
                        }}
                    />
                    <div style={{width: "100%"}}></div>
                    <SendOutlined
                        style={{
                            fontSize: 24,
                            marginLeft: 12,
                            marginTop: -5,
                        }}
                        disabled={true}
                        onClick={() => send()}
                    />
                </Flex>
                <Divider
                    style={{
                        margin: 0
                    }}
                />
                <TextArea
                    style={{
                        // overflow: "hidden",
                        resize: "none",
                        padding: 16
                    }}
                    bordered={false}
                    rows={3}
                    placeholder="Nhập tin nhắn"
                    onChange={(e) => setMessage(o => ({...o, content: e.target.value}))}
                />
            </Flex>
        </Affix>
    )
}
export default SendMessageComponent