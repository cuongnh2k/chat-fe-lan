import React from 'react'
import {Flex, Input, theme} from 'antd'

const {Search} = Input;
const SearchComponent = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Flex
            justify="center"
            style={{
                background: colorBgContainer,
                padding: "8px 16px",
            }}
        >
            <Search
                placeholder="input search text"
                // onSearch={onSearch}
                style={{
                    width: "100%",
                    maxWidth: 500
                }}
                size="large"
            />
        </Flex>
    )
}
export default SearchComponent