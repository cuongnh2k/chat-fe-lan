import LayoutComponent from "../../layout/LayoutComponent";
import React, {useEffect} from "react";
import SendMessageComponent from "./SendMessageComponent";
import ListMessageComponent from "./ListMessageComponent";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/account")
        }
    }, []);

    return (
        <LayoutComponent>
            <ListMessageComponent/>
            <SendMessageComponent/>
        </LayoutComponent>
    )
}
export default HomePage