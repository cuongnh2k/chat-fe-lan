import LayoutComponent from "../../layout/LayoutComponent";
import React from "react";
import SendMessageComponent from "./SendMessageComponent";
import ListMessageComponent from "./ListMessageComponent";

const HomePage = () => {
    return (
        <LayoutComponent>
            <ListMessageComponent/>
            <SendMessageComponent/>
        </LayoutComponent>
    )
}
export default HomePage