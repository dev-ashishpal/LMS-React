import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
// ];
const COLORS = ["#00CED1", "#55c57a", "#ff6932"];

class DonutGraph extends PureComponent {
  render() {
      const videoData = {...this.props.data};
      const data = Object.values(videoData);
      // console.log('[Donut]', data);
    return (
      <PieChart width={200} height={200} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={90}
          cy={100}
          innerRadius={55}
          outerRadius={70}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
}

export default DonutGraph;
