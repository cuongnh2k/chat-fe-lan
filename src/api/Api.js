const Api = {
    authsActivePOST: {
        path: "/basic/auths/active",
        method: "POST",
        contentType: "application/json",
    },
    authsLoginPOST: {
        path: "/basic/auths/login",
        method: "POST",
        contentType: "application/json",
    },
    authsRegisterPOST: {
        path: "/basic/auths/register",
        method: "POST",
        contentType: "application/json",
    },
    authsResetPasswordPOST: {
        path: "/basic/auths/reset-password",
        method: "POST",
        contentType: "application/json",
    },
    channelsChannelIdMessagesMessageIdDELETE: {
        path: "/user/channels/{channelId}/messages/{messageId}",
        method: "DELETE",
        contentType: "application/json",
    },
    channelsGET: {
        path: "/user/channels",
        method: "GET",
        contentType: "application/json",
    },
    channelsChannelIdGET: {
        path: "/user/channels",
        method: "GET",
        contentType: "application/json",
    },
    channelsChannelIdFilesGET: {
        path: "/user/channels/{channelId}/files",
        method: "GET",
        contentType: "application/json",
    },
    channelsChannelIdMemberGET: {
        path: "/user/channels/{channelId}/member",
        method: "GET",
        contentType: "application/json",
    },
    channelsChannelIdMessagesGET: {
        path: "/user/channels/",
        method: "GET",
        contentType: "application/json",
    },
    channelsChannelIdMessagesMessageIdPATCH: {
        path: "/user/channels/{channelId}/messages/{messageId}",
        method: "PATCH",
        contentType: "application/json",
    },
    channelsAddUserFriendPOST: {
        path: "/user/channels/add-user-friend",
        method: "POST",
        contentType: "application/json",
    },
    channelsCreateGroupPOST: {
        path: "/user/channels/create-group",
        method: "POST",
        contentType: "application/json",
    },
    channelsAddUserGroupPOST: {
        path: "/user/channels/{channelId}/add-user-group",
        method: "POST",
        contentType: "application/json",
    },
    channelsChannelIdMessagesPOST: {
        path: "/user/channels/",
        method: "POST",
        contentType: "application/json",
    },
    channelsChannelIdReactUserFriendPOST: {
        path: "/user/channels/{channelId}/react-user-friend",
        method: "POST",
        contentType: "application/json",
    },
    channelsChannelIdReactUserGroupPOST: {
        path: "/user/channels/{channelId}/react-user-group",
        method: "POST",
        contentType: "application/json",
    },
    filesFileIdDELETE: {
        path: "/user/files/",
        method: "DELETE",
        contentType: "application/json",
    },
    filesPOST: {
        path: "/user/files",
        method: "POST",
        contentType: "application/json",
    },
    usersGET: {
        path: "/user/users",
        method: "GET",
        contentType: "application/json",
    },
    usersPATCH: {
        path: "/user/users",
        method: "PATCH",
        contentType: "application/json",
    },
    usersToAddFriendGET: {
        path: "/user/users/to-add-friend",
        method: "GET",
        contentType: "application/json",
    },
    usersToAddGroupGET: {
        path: "/user/users/to-add-group",
        method: "GET",
        contentType: "application/json",
    },
}
export default Api