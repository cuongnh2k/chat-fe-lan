import React, {useEffect, useState} from 'react';
import VirtualList from 'rc-virtual-list';
import {Avatar, Card, Flex, List, message} from 'antd';

const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = window.innerHeight - 200;
const ListMessageComponent = () => {
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
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
            >
                {(item, index) => (
                    index % 2 === 0
                        ? <Flex
                            style={{
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 16
                            }}
                            // justify={"flex-start"}
                        >
                            <Avatar
                                style={{
                                    minWidth: 48,
                                    height: 48,
                                    marginRight: 16
                                }}
                                src={`https://randomuser.me/api/portraits/men/48.jpg`}
                            />
                            <Card
                                style={{
                                    maxWidth: 600
                                }}
                                size="small"
                                bordered={false}
                            >
                                <p>Dân Trí là một tờ báo điện tử trực thuộc Bộ Lao động - Thương binh và Xã hội. Theo
                                    thống
                                    kê của Google, đến nay, mỗi tháng có bình quân Dân trí có 900 triệu lượt đọc; mỗi
                                    ngày
                                    có bình quân trên 10 triệu lượt người truy cập vào báo Dân trí tiếng Việt và tiếng
                                    Anh,
                                    trong đó 20% người truy cập từ nước ngoài. Wikipedia</p>
                            </Card>
                        </Flex>
                        : <Flex
                            style={{
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 16
                            }}
                            justify={"flex-end"}
                        >
                            <Card
                                style={{
                                    maxWidth: 664,
                                }}
                                size="small"
                                bordered={false}
                            >
                                <p>Dân Trí là một tờ báo. Wikipedia</p>
                            </Card>
                        </Flex>
                )}
            </VirtualList>
        </List>
    )
}
export default ListMessageComponent