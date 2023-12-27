import React from 'react';
import {Layout} from 'antd';
import ListFriendComponent from "./ListFriendComponent";
import AffixSiderComponent from "./AffixSiderComponent";

const {Sider} = Layout;

const SiderComponent = ({responseCollapsed, collapsed}) => {
    return (
        <Sider
            style={{
                height: window.innerHeight,
                border: "1px solid LightGrey"
            }}
            breakpoint="md"
            collapsedWidth="1"
            onBreakpoint={(broken) => {
            }}
            onCollapse={(collapsed, type) => {
                responseCollapsed(collapsed)
            }}
            collapsed={collapsed}
            width={350}
            theme={"light"}

        >
            <AffixSiderComponent/>
            <ListFriendComponent/>
        </Sider>
    )
}
export default SiderComponent