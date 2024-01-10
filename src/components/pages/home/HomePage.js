import LayoutComponent from "../../layout/LayoutComponent";
import React, {useEffect, useState} from "react";
import SendMessageComponent from "./SendMessageComponent";
import ListMessageComponent from "./ListMessageComponent";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const [token] = useState(localStorage.getItem("token"))
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/account")
        }
    }, [token]);

    return (
        <LayoutComponent>
            <ListMessageComponent/>
            <SendMessageComponent/>
        </LayoutComponent>
    )
}
export default HomePage