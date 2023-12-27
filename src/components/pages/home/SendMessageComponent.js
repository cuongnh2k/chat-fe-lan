import {Affix, Input} from "antd";
import React from "react";
import {FileAddOutlined, SmileOutlined} from "@ant-design/icons";

const {TextArea} = Input;
const SendMessageComponent = () => {
    return (
        <Affix
            style={{marginTop: 16}}
            offsetBottom={16}
        >
            <FileAddOutlined
                style={{
                    fontSize: 24,
                    marginRight: 10
            }}
            />
            <SmileOutlined style={{fontSize: 24}}/>
            <TextArea rows={4} placeholder="maxLength is 6" maxLength={1000}/>
        </Affix>
    )
}
export default SendMessageComponent