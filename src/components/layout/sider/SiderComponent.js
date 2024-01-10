import React from 'react';
import {Layout} from 'antd';
import ListCurrentChannelComponent from "./ListCurrentChannelComponent";
import AffixSiderComponent from "./affixsider/AffixSiderComponent";

const {Sider} = Layout;

const SiderComponent = ({responseCollapsed, collapsed}) => {
    return (
        <Sider
            style={{
                height: window.innerHeight,
                border: "1px solid LightGrey"
            }}
            breakpoint="lg"
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
            <AffixSiderComponent collapsed={collapsed}/>
            <ListCurrentChannelComponent/>
        </Sider>
    )
}
export default SiderComponent