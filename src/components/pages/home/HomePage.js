import LayoutComponent from "../../layout/LayoutComponent";
import React, {useEffect, useState} from "react";
import SendMessageComponent from "./SendMessageComponent";
import ListMessageComponent from "./ListMessageComponent";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const [editContent, setEditContent] = useState({id: null, content: null})

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/account")
        }
    }, []);

    const setContent = (id, content) => {
        setEditContent(o => {
            if (id !== '1') {
                o.id = id
            }
            o.content = content
            return o
        })
    }

    return (
        <LayoutComponent>
            <ListMessageComponent setContent={setContent}/>
            <SendMessageComponent editContent={editContent} setContent={setContent}/>
        </LayoutComponent>
    )
}
export default HomePage