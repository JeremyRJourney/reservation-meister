/*  ======================================
    Hard code Server URL if being built

*/

const isUsingBuild = true
const GetAPI = () => {
    return isUsingBuild ? "https://reservation-meister.dev/api/" : "http://localhost:5000/"
}

export default GetAPI