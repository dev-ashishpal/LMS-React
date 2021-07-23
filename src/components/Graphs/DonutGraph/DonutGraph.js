import React, { PureComponent } from "react";
import classes from "./DonutGraph.module.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import PropTypes from "prop-types";

const COLORS = ["#00CED1", "#55c57a", "#ff6932"];

class DonutGraph extends PureComponent {
  render() {
    const videoData = { ...this.props.data };
    const data = Object.values(videoData);
    let number = 0;
    data.forEach((dt) => {
      number += dt.value;
    });
    return (
      <div className={classes.DonutContainer}>
        <div className={classes.Donut}>
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className={classes.Number}>{number}</div>
      </div>
    );
  }
}

DonutGraph.propTypes = {
  data: PropTypes.object,
};

export default DonutGraph;
