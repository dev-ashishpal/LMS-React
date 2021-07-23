import React from "react";
import classes from "./Select.module.css";
import Option from "./Option/Option";
import PropTypes from "prop-types";

class Select extends React.Component {
  state = {
    selectedData: [],
    opened: false,
  };

  onSelectClick = () => {
    this.setState((prevState) => {
      return { opened: !prevState.opened };
    });
  };

  render() {
    let containerClass = [classes.SearchFilterContainer];
    if (this.state.opened) {
      containerClass = [classes.SearchFilterContainer, classes.active];
    }
    let showTitle;
    if (this.props.list.length === 0) {
      showTitle = <div className={classes.Title}>Select the Branch...</div>;
    } else {
      showTitle = (
        <div>
          {this.props.list.map((data) => (
            <span className={classes.ListItem} key={data}>
              {data}
            </span>
          ))}
        </div>
      );
    }
    return (
      <div className={classes.SearchFilter}>
        <div className={classes.SearchFilterBox}>
          <div className={containerClass.join(" ")}>
            {this.props.data.map((option) => (
              <Option
                value={option.value}
                key={option.value}
                changed={this.props.changed}
                selectType={this.props.selectType}
              />
            ))}
          </div>
          <div className={classes.Selected} onClick={this.onSelectClick}>
            {showTitle}
          </div>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  selectType: PropTypes.oneOf(['radio','checkbox']),
  data: PropTypes.array,
  list: PropTypes.array,

  changed: PropTypes.func,
};

export default Select;
