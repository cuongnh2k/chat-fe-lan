import {Affix, Flex} from "antd";
import React from "react";
import AddFriendComponent from "./AddFriendComponent";
import AddGroupComponent from "./AddGroupComponent";
import SearchSiderComponent from "./SearchSiderComponent";
import TabSiderComponent from "./TabSiderComponent";
import UserSiderComponent from "./user/UserSiderComponent";
import EllipsisComponent from "./EllipsisComponent";


const AffixContentComponent = ({onChangeType, onChangeSearch, collapsed}) => {

    return (
        <Affix
            style={{
                display: collapsed ? "none" : "inline"
            }}
            offsetTop={0}
        >
            <div>
                <EllipsisComponent/>
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
            </div>
        </Affix>
    )
}
export default AffixContentComponent