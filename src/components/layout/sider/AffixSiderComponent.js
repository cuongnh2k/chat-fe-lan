import {Affix, Avatar, Button, Divider, Flex, Typography} from "antd";
import React from "react";
import SearchComponent from "../content/affix/SearchComponent";

const {Text} = Typography;
const AffixContentComponent = ({collapsed}) => {
    return (
        <Affix
            offsetTop={0}
            style={{
                display: collapsed ? "none" : "inline"
            }}
        >
            <Flex
                style={{
                    padding: "8px 16px"
                }}
            >
                <Avatar
                    style={{
                        width: 48,
                        height: 48,
                        marginRight: 16
                    }}
                    src={"https://s3.ap-southeast-1.amazonaws.com/space.cuongnh2k.s3.bucket.public/bc83f21c-94fd-42a6-9589-0f789438d545/4e7c2f9e-5fbf-4afa-a665-bfadd8ec2096.jpg"}
                />
                <Flex
                    vertical={true}
                >
                    <Text style={{fontWeight: "bold"}}>Nguyễn Thị Lan</Text>
                    <Text>lannhatthuy@gmail.com</Text>
                </Flex>
            </Flex>
            <SearchComponent/>
            <Button
                style={{
                    marginLeft: 16,
                    width: 100
                }}
                type="primary"
                shape="round"
                size={48}
            >
                Danh bạ
            </Button>
            <Button
                style={{
                    marginLeft: 16,
                    width: 100
                }}
                type="primary"
                shape="round"
                size={48}
            >
                Nhóm
            </Button>
            <Divider style={{margin: 0}}/>
        </Affix>
    )
}
export default AffixContentComponent