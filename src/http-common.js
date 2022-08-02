import axios from "axios";

let baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://ec2-54-177-20-6.us-west-1.compute.amazonaws.com:9005/api/";
} else {
  baseurl = "http://ec2-54-177-20-6.us-west-1.compute.amazonaws.com:9005/api/";
}
export {baseurl};
// export default axios.create({
//   baseURL: baseurl,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "X-Requested-With": "XMLHttpRequest",
//     crossDomain: true
//   }
// });
