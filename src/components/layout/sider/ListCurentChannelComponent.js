import React, {useEffect, useState} from 'react';
import VirtualList from 'rc-virtual-list';
import {Avatar, List, message} from 'antd';
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";

const ContainerHeight = window.innerHeight - 198;

const ListCurentChannelComponent = () => {
    const [data, setData] = useState([]);
    const appendData = () => {
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
                message.success(`${body.results.length} more items loaded!`);
            });
    };
    useEffect(() => {
        appendData();
    }, []);

    // useEffect(() => {
    //         if (resetPassword.email !== "") {
    //             setData(o => ({...o, loading: true}))
    //             const fetchAPI = async () => {
    //                 const response = await UseFetch(Api.authsResetPasswordPOST,
    //                     "",
    //                     JSON.stringify({
    //                         email: resetPassword.email,
    //                     }))
    //                 const data = await response.json();
    //                 setData(o => ({...o, loading: false}))
    //                 if (data.success) {
    //                     messageApi.open({
    //                         type: 'success',
    //                         content: 'Mật khẩu mới đã được gửi về email của bạn',
    //                         duration: 3,
    //                     });
    //                     onResetPassword(resetPassword.email)
    //                 } else {
    //                     messageApi.open({
    //                         type: 'error',
    //                         content: 'Email không tồn tại',
    //                         duration: 1,
    //                     });
    //                 }
    //             }
    //             fetchAPI()
    //         }
    //     }, [resetPassword]
    // )

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