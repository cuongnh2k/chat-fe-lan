import {Affix, Divider, Flex, Input, Upload} from "antd";
import React from "react";
import {SendOutlined, UploadOutlined} from "@ant-design/icons";

const {TextArea} = Input;
const SendMessageComponent = () => {
    return (
        <Affix
            offsetBottom={0}
        >
            <Flex
                vertical={true}
                style={{
                    background: "white",
                    paddingLeft: 16,
                    paddingRight: 16
                }}
            >
                <Flex
                    style={{
                        paddingTop: 5
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
                    <i
                        style={{
                            fontSize: 24,
                            marginLeft: 12,
                            marginTop: -5,
                            cursor: "pointer"
                        }}
                        className="bi bi-emoji-smile"/>
                </Flex>
                <Divider
                    style={{
                        margin: 0
                    }}
                />
                <Flex>
                    <TextArea
                        style={{
                            overflow: "hidden",
                            resize: "none",
                            padding: "16px 0"
                        }}
                        bordered={false}
                        rows={3}
                        placeholder="Nhập tin nhắn"
                    />
                    <SendOutlined
                        style={{
                            fontSize: 24,
                            cursor: "pointer"
                        }}
                    />
                </Flex>
            </Flex>
        </Affix>
    )
}
export default SendMessageComponent