import SiderComponent from "./sider/SiderComponent";
import React, {useState} from 'react';
import {Layout} from 'antd';
import ContentComponent from "./content/ContentComponent";

const LayoutComponent = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);

    const clickCollapsed = () => {
        setCollapsed(!collapsed)
    }

    const responseCollapsed = (collapsed) => {
        setCollapsed(collapsed)
    }
    return (
        <Layout
        >
            <SiderComponent responseCollapsed={responseCollapsed} collapsed={collapsed}/>
            <ContentComponent clickCollapsed={clickCollapsed} collapsed={collapsed}>
                {children}
            </ContentComponent>
        </Layout>
    )
}
export default LayoutComponent