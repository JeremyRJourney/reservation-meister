/*  ======================================
    Hard code Server URL if being built

*/

const isUsingBuild = false

const GetAPI = () => {
    if (isUsingBuild) {
        return "http://localhost:5000/"
    }
    else {
        return ""
    }
}

export default GetAPI
