import {Button, Result} from "antd";
import LayoutComponent from "../layout/LayoutComponent";

const NoPage = () => {
    return (
        <LayoutComponent>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </LayoutComponent>
    )
}
export default NoPage