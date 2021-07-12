// import React, { PureComponent } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
//
// const data = [
//   {
//     name: "Page A",
//     Video: 1,
//     Notes: 2,
//     Paper: 10,
//   },
//   {
//     name: "Page B",
//     Video: 3,
//     Notes: 13,
//     Paper: 3,
//   },
//   {
//     name: "Page C",
//     Video: 5,
//     Notes: 5,
//     Paper: 0,
//   },
//   {
//     name: "Page D",
//     Video: 27,
//     Notes: 39,
//     Paper: 6,
//   },
//   {
//     name: "Page E",
//     Video: 18,
//     Notes: 38,
//     Paper: 12,
//   },
//   {
//     name: "Page F",
//     Video: 23,
//     Notes: 3,
//     Paper: 10,
//   },
//   {
//     name: "Page G",
//     Video: 3,
//     Notes: 43,
//     Paper: 16,
//   },
// ];
//
// class LineGraph extends PureComponent {
//
//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: -10,
//             bottom: 5,
//           }}
//         >
//           <Legend />
//           {/*<CartesianGrid strokeDasharray="3 3"/>*/}
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="Notes"
//             stroke="#00CED1"
//             strokeWidth="2px"
//             activeDot={{ r: 8 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="Video"
//             stroke="#55c57a"
//             strokeWidth="2px"
//             activeDot={{ r: 8 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="Paper"
//             stroke="#ff6932"
//             strokeWidth="2px"
//             activeDot={{ r: 8 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }
// }
//
// export default LineGraph;
