import {InfoCircleOutlined} from "@ant-design/icons";
import {Dropdown} from "antd";
import React from "react";
import ListMemberComponent from "./ListMemberComponent";
import ListFileComponent from "./ListFileComponent";

const InfoComponent = ({data}) => {
    let items = [];
    if (data.result && data.result.status === "ACCEPT") {
        items.push({
            key: '2',
            label: (
                <ListFileComponent/>
            ),
        },)
        if (data.result.type === 'GROUP') {
            items.push({
                key: '1',
                label: (
                    <ListMemberComponent data1={data}/>
                ),
            },)
        }
    }
    return (
        <Dropdown
            menu={{items}}
            placement="bottomRight"
            arrow={{
                pointAtCenter: true,
            }}
        >
            <InfoCircleOutlined
                style={{
                    fontSize: 18,
                    paddingLeft: 8,
                    paddingRight: 0,
                    cursor: "pointer"
                }}
            />
        </Dropdown>
    )
}
export default InfoComponent