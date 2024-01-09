import {UserAddOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Modal} from 'antd';

const AddFriendComponent = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            <UserAddOutlined
                style={{
                    fontSize: 16,
                    paddingLeft: 16,
                    paddingRight: 8,
                    cursor: "pointer"
                }}
                onClick={showModal}
            />
            <Modal
                title="Thêm bạn"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    )
}
export default AddFriendComponent