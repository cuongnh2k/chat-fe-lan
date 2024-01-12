import {Modal, Typography} from "antd";
import React from "react";
import UpdateAvatarComponent from "./UpdateAvatarComponent";

const {Text} = Typography;

const UpdateUserComponent = ({isModalOpen, closeModal, onRefresh, data, messageApi}) => {
    const handleOk = () => {
        closeModal()
    };
    const handleCancel = () => {
        closeModal()
    };
    return (
        <Modal
            title="Cập nhật tài khoản"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
        >

            <UpdateAvatarComponent onRefresh={onRefresh} data={data} messageApi={messageApi}/>
            {/*<Flex*/}
            {/*    justify="center"*/}
            {/*    style={{*/}
            {/*        marginTop: 16,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Text>{data.result && data.result.local.email}</Text>*/}
            {/*</Flex>*/}
            {/*<UpdateNameComponent onChangeTab={onChangeTab} data={data} messageApi={messageApi}/>*/}
            {/*<UpdatePasswordComponent onChangeTab={onChangeTab} messageApi={messageApi}/>*/}
            {/*<SignOutComponent onChangeTab={onChangeTab} messageApi={messageApi}/>*/}

        </Modal>
    )
}
export default UpdateUserComponent