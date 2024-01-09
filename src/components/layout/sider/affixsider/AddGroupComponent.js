import {UsergroupAddOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Modal} from 'antd';

const AddGroupComponent = () => {
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
            <UsergroupAddOutlined
                style={{
                    fontSize: 16,
                    paddingLeft: 8,
                    cursor: "pointer"
                }}
                onClick={showModal}
            />
            <Modal
                title="Thêm nhóm"
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
export default AddGroupComponent