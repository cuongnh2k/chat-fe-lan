import {Modal} from "antd";

const UpdateUserComponent = ({isModalOpen, closeModal}) => {

    const handleOk = () => {
        closeModal()
    };
    const handleCancel = () => {
        closeModal()
    };

    return (
        <Modal title="Cập nhật tài khoản" open={{isModalOpen}} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}
export default UpdateUserComponent