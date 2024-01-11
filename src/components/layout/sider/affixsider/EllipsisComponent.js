import {Dropdown, Flex} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import React from "react";
import {useNavigate} from "react-router-dom";

const EllipsisComponent = () => {
    const navigate = useNavigate();
    const items = [
        {
            key: '1',
            label: (
                <a
                    onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/account")
                    }}
                >
                    Đăng xuất
                </a>
            ),
        },
    ];
    return (
        <Flex
            style={{
                paddingLeft: 16,
                paddingRight: 16,
            }}
            justify={"flex-end"}
        >
            <Dropdown
                menu={{items}}
                placement="bottomRight"
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <EllipsisOutlined
                    style={{
                        fontSize: 24,
                        cursor: "pointer"
                    }}
                />
            </Dropdown>
        </Flex>
    )
}
export default EllipsisComponent