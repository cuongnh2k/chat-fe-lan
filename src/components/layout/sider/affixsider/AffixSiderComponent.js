import {Affix, Flex} from "antd";
import React from "react";
import {EllipsisOutlined} from "@ant-design/icons";
import AddFriendComponent from "./AddFriendComponent";
import AddGroupComponent from "./AddGroupComponent";
import SearchSiderComponent from "./SearchSiderComponent";
import TabSiderComponent from "./TabSiderComponent";
import UserSiderComponent from "./UserSiderComponent";


const AffixContentComponent = ({onChangeType, onChangeSearch, collapsed}) => {

    return (
        <Affix
            style={{
                display: collapsed ? "none" : "inline"
            }}
            offsetTop={0}
        >
            <Flex
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                }}
                justify={"flex-end"}
            >
                <EllipsisOutlined
                    style={{
                        fontSize: 24,
                        cursor: "pointer"
                    }}
                />
            </Flex>
            <Flex
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                }}
            >
                <UserSiderComponent/>
                <AddFriendComponent/>
                <AddGroupComponent/>
            </Flex>
            <SearchSiderComponent onChangeSearch={onChangeSearch}/>
            <TabSiderComponent onChangeType={onChangeType}/>
        </Affix>
    )
}
export default AffixContentComponent