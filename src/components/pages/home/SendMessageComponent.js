import {Affix, Divider, Flex, Input, Upload} from "antd";
import React, {useState} from "react";
import {FileAddOutlined, FolderAddOutlined, SendOutlined} from "@ant-design/icons";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import {useNavigate, useSearchParams} from "react-router-dom";

const {TextArea} = Input;
const SendMessageComponent = () => {
    const [data, setData] = useState({loading: false})
    const [message, setMessage] = useState({content: "", files: []})
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const send = () => {
        // if (message.content !== "") {
        setData(o => ({...o, loading: true}))
        const fetchAPI = async () => {
            const response = await UseFetch(Api.channelsChannelIdMessagesPOST,
                `${searchParams.get("channelId")}/messages`,
                JSON.stringify({content: message.content})
            )
            const res = await response.json();
            if (res.success) {
                // setData(o => ({...o, loading: false,}))
                // setMessage(o => ({...o, content: "", files: []}))
            } else {
                localStorage.removeItem("token")
                navigate("/account")
            }
        }
        fetchAPI()
        // }
    }

    const onChangeFiles = (info) => {
        if (info.file.status === 'done') {
            if (info.file.response.success) {

                let files = [];
                files = message.files.concat({
                    contentType: info.file.response.data.contentType,
                    name: info.file.response.data.name,
                    size: info.file.response.data.size,
                    url: info.file.response.data.url
                })
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.channelsChannelIdMessagesPOST,
                        `${searchParams.get("channelId")}/messages`,
                        JSON.stringify({files: files})
                    )
                    const res = await response.json();
                    if (res.success) {
                        // setData(o => ({...o, loading: false,}))
                        // setMessage(o => ({...o, content: "", files: []}))
                    } else {
                        localStorage.removeItem("token")
                        navigate("/account")
                    }
                }
                fetchAPI()
            } else {
                localStorage.removeItem("token")
                navigate("/account")
            }
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
                    align={"flex-start"}
                    style={{
                        paddingTop: 5,
                        paddingLeft: 16,
                        paddingRight: 16
                    }}
                >
                    <Upload
                        multiple={true}
                        // directory={false}
                        name='file'
                        action={`${process.env.REACT_APP_HOST}${Api.filesPOST.path}`}
                        headers={
                            {"Authorization": localStorage.getItem("token")}
                        }
                        onChange={onChangeFiles}
                        showUploadList={false}
                    >
                        <FileAddOutlined
                            style={{
                                cursor: "pointer",
                                fontSize: 24,
                                marginTop: 5
                            }}
                        />
                    </Upload>
                    <Upload
                        multiple={true}
                        directory={true}
                        name='file'
                        action={`${process.env.REACT_APP_HOST}${Api.filesPOST.path}`}
                        headers={
                            {"Authorization": localStorage.getItem("token")}
                        }
                        onChange={onChangeFiles}
                        showUploadList={false}
                    >
                        <FolderAddOutlined
                            style={{
                                cursor: "pointer",
                                fontSize: 24,
                                marginLeft: 16,
                                marginTop: 5
                            }}
                        />
                    </Upload>
                    <i className="bi bi-emoji-smile" style={{
                        fontSize: 24,
                        marginLeft: 16,
                        marginBottom: 5,
                        cursor: "pointer"
                    }}/>
                    <div style={{width: "100%"}}></div>
                    <SendOutlined
                        style={{
                            fontSize: 24,
                            marginLeft: 12,
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
                >
                    message.content
                </TextArea>
            </Flex>
        </Affix>
    )
}
export default SendMessageComponent