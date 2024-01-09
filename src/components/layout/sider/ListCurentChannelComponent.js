import React, {useEffect, useState} from 'react';
import VirtualList from 'rc-virtual-list';
import {Avatar, List, message} from 'antd';

const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = window.innerHeight - 159;

const ListCurentChannelComponent = () => {
    const [data, setData] = useState([]);
    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
                message.success(`${body.results.length} more items loaded!`);
            });
    };
    useEffect(() => {
        appendData();
    }, []);
    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData();
        }
    };
    return (
        <List>
            <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={48}
                itemKey="email"
                onScroll={onScroll}
            >
                {(item) => (
                    <List.Item
                        style={{
                            paddingLeft: 16,
                            paddingRight: 16
                        }}
                        key={item.email}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} style={{width: 48, height: 48}}/>}
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description={item.email}
                        />
                        {/*<div>Content</div>*/}
                    </List.Item>
                )}
            </VirtualList>
        </List>
    )
}
export default ListCurentChannelComponent