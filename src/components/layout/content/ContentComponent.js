import React from 'react';
import {Layout, theme} from 'antd';
import AffixContentComponent from "./affix/AffixContentComponent";

const {Content} = Layout;
const ContentComponent = ({children, clickCollapsed, collapsed}) => {

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout>
            <AffixContentComponent clickCollapsed={clickCollapsed} collapsed={collapsed}/>
            <Content>
                <div
                    style={{
                        padding: 16,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </div>
            </Content>
        </Layout>
    )
}
export default ContentComponent