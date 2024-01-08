import LayoutComponent from "../../layout/LayoutComponent";
import React, {useState} from "react";
import SendMessageComponent from "./SendMessageComponent";
import ListMessageComponent from "./ListMessageComponent";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    if (!token) {
        navigate("/account")
    } else {
        return (
            <LayoutComponent>
                <ListMessageComponent/>
                <SendMessageComponent/>
            </LayoutComponent>
        )
    }
}
export default HomePage