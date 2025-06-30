// import $ from "jquery";

// export const analyzeTextViaAPI = (text) => {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: "http://localhost:5000/analyze",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify({ text }),
//       success: function (data) {
//         resolve(data);
//       },
//       error: function (xhr, status, error) {
//         console.error("API Error:", error);
//         reject(error);
//       },
//     });
//   });
// };