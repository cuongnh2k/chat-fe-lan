const Api = {
    bAuthsActivePOST: {
        path: "/basic/auths/active",
        method: "POST",
        contentType: "application/json",
    },
    bAuthsResetPasswordPOST: {
        path: "/basic/auths/reset-password",
        method: "POST",
        contentType: "application/json",
    },
    bAuthsSignInPOST: {
        path: "/basic/auths/sign-in",
        method: "POST",
        contentType: "application/json",
    },
    bAuthsSignUpPOST: {
        path: "/basic/auths/sign-up",
        method: "POST",
        contentType: "application/json",
    },

    bCategoriesGET: {
        path: "/basic/categories",
        method: "GET",
        contentType: "application/json",
    },

    bObjectsV2GET: {
        path: "/basic/objects-v2",
        method: "GET",
        contentType: "application/json",
    }, bObjectsV2IdGET: {
        path: "/basic/objects-v2/{id}",
        method: "GET",
        contentType: "application/json",
    },

    bReviewsGET: {
        path: "/basic/reviews",
        method: "GET",
        contentType: "application/json",
    }, bReviewsIdGET: {
        path: "/basic/reviews/{id}",
        method: "GET",
        contentType: "application/json",
    },

    uFilesIdDELETE: {
        path: "/user/files/{fileId}",
        method: "DELETE",
        contentType: "application/json",
    },
    uFilesPOST: {
        path: "/user/files",
        method: "POST",
        contentType: "multipart/form-data",
    },

    uNotificationsGET: {
        path: "/user/notifications",
        method: "GET",
        contentType: "application/json",
    }, uNotificationsIdPUT: {
        path: "/user/notifications/{id}",
        method: "PUT",
        contentType: "application/json",
    },

    uObjectsV1GET: {
        path: "/user/objects-v1",
        method: "GET",
        contentType: "application/json",
    }, uObjectsV1IdGET: {
        path: "/user/objects-v1/{id}",
        method: "GET",
        contentType: "application/json",
    }, uObjectsV1IdPATCH: {
        path: "/user/objects-v1/{id}",
        method: "PATCH",
        contentType: "application/json",
    }, uObjectsV1POST: {
        path: "/user/objects-v1",
        method: "POST",
        contentType: "application/json",
    },

    uReviewsIdDELETE: {
        path: "/user/reviews/{objectId}",
        method: "DELETE",
        contentType: "application/json",
    }, uReviewsIdCommentDELETE: {
        path: "/user/reviews/{reviewId}/comment",
        method: "DELETE",
        contentType: "application/json",
    }, uReviewsIdCommentPATCH: {
        path: "/user/reviews/{reviewId}/comment",
        method: "PATCH",
        contentType: "application/json",
    }, uReviewsGETPOST: {
        path: "/user/reviews",
        method: "POST",
        contentType: "application/json",
    }, uReviewsIdCommentPOST: {
        path: "/user/reviews/{reviewId}/comment",
        method: "POST",
        contentType: "application/json",
    }, uReviewsIdReactionPOST: {
        path: "/user/reviews/{reviewId}/reaction",
        method: "POST",
        contentType: "application/json",
    },

    uUsersGET: {
        path: "/user/users",
        method: "GET",
        contentType: "application/json",
    }, uUsersPATCH: {
        path: "/user/users",
        method: "PATCH",
        contentType: "application/json",
    },
}
export default Api