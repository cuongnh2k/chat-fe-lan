const UseFetch = (api, params = "", body = null) => {

    return fetch(`${process.env.REACT_APP_HOST}${api.path}${params}`,
        {
            method: api.method,
            headers: {
                "Content-Type": api.contentType,
                "Api-Key": process.env.REACT_APP_API_KEY,
                "Authorization": localStorage.getItem("token")
            },
            body: body
        }
    )
}
export default UseFetch