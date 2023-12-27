import {Affix, Divider, Flex} from "antd";
import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import SearchComponent from "./SearchComponent";

const AffixContentComponent = ({clickCollapsed, collapsed}) => {
    return (
        <Affix
            offsetTop={0}
        >
            <Flex
                onClick={() => clickCollapsed()}
            >
                {collapsed
                    ? <MenuUnfoldOutlined
                        style={{
                            fontSize: 24,
                            width: "100%",
                            background: "white",
                        }}
                    />
                    : <MenuFoldOutlined
                        style={{
                            fontSize: 24,
                            width: "100%",
                            background: "white",
                        }}
                    />
                }
            </Flex>
            <SearchComponent/>
            <Divider style={{margin: 0}}/>
        </Affix>
    )
}
export default AffixContentComponent