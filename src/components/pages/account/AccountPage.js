import {useState} from "react";
import {message} from "antd";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import ResetPasswordComponent from "./ResetPasswordComponent";
import ActiveAccountComponent from "./ActiveAccountComponent";
import {useNavigate} from "react-router-dom";

const AccountPage = () => {
    const token = localStorage.getItem("token")

    const [account, setAccount] = useState({
        activeKey: "sign-in",
        signIn: false,
        signInActiveAccountEmail: "",
        signUpEmail: "",
        activeAccountEmail: "",
        resetPasswordEmail: ""
    })

    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();

    const onChangeTab = (activeKey) => {
        setAccount(o => ({...o, activeKey: activeKey}))
    }

    const onSignIn = (value) => {
        setAccount(o => ({...o, signIn: value}))
    }

    const onSignInActiveAccount = (value) => {
        setAccount(o => ({...o, activeKey: "active-account", signInActiveAccountEmail: value}))
    }

    const onSignUp = (value) => {
        setAccount(o => ({...o, activeKey: "active-account", signUpEmail: value}))
    }

    const onActiveAccount = (value) => {
        setAccount(o => ({...o, activeKey: "sign-in", activeAccountEmail: value}))
    }

    const onResetPassword = (value) => {
        setAccount(o => ({...o, activeKey: "sign-in", resetPasswordEmail: value}))
    }

    if (token) {
        navigate("/")
    } else {
        return (
            <div>
                {contextHolder}
                {
                    account.activeKey === "reset-password"
                        ? <ResetPasswordComponent
                            onChangeTab={onChangeTab}
                            onResetPassword={onResetPassword}
                            account={account}
                            messageApi={messageApi}
                        />
                        : (account.activeKey === "active-account"
                                ? <ActiveAccountComponent
                                    onChangeTab={onChangeTab}
                                    onActiveAccount={onActiveAccount}
                                    account={account}
                                    messageApi={messageApi}
                                />
                                : (account.activeKey === "sign-in"
                                        ? <SignInComponent
                                            onChangeTab={onChangeTab}
                                            onSignIn={onSignIn}
                                            onSignInActiveAccount={onSignInActiveAccount}
                                            account={account}
                                            messageApi={messageApi}
                                        />
                                        : (<SignUpComponent
                                                onChangeTab={onChangeTab}
                                                onSignUp={onSignUp}
                                                account={account}
                                                messageApi={messageApi}
                                            />
                                        )
                                )
                        )
                }
            </div>
        )
    }
}
export default AccountPage