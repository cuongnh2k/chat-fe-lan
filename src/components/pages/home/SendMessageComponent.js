import {Affix, Flex, Input} from "antd";
import React from "react";
import {SendOutlined} from "@ant-design/icons";

const {TextArea} = Input;
const SendMessageComponent = () => {
    return (
        <Affix
            offsetBottom={0}
        >
            <Flex
                style={{
                    background: "white",
                    paddingRight: 16
                }}
            >
                <TextArea
                    style={{
                        overflow: "hidden",
                        paddingLeft: 16,
                        paddingRight: 16
                    }}
                    bordered={false}
                    rows={4}
                    placeholder="maxLength is 6"
                    maxLength={1000}
                />
                <SendOutlined
                    style={{
                        fontSize: 24
                    }}
                />
            </Flex>
        </Affix>
    )
}
export default SendMessageComponent