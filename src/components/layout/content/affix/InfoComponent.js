import {InfoCircleOutlined} from "@ant-design/icons";
import {Dropdown} from "antd";
import React from "react";
import ListMemberComponent from "./ListMemberComponent";
import ListFileComponent from "./ListFileComponent";

const InfoComponent = ({data}) => {
    let items = [
        {
            key: '1',
            label: (
                <ListMemberComponent data1={data}/>
            ),
        },
        {
            key: '2',
            label: (
                <ListFileComponent/>
            ),
        },
    ];
    if (data.result && data.result.type === "FRIEND") {
        items.shift()
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