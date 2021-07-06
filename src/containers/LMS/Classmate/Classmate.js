import React, { PureComponent } from "react";
import classes from "./Classmate.module.css";
import * as actionCreators from "./store/actions";
import Card from "../../../components/Card/Card";
import { connect } from "react-redux";
import {advanceSearch} from "../../../util/search";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";

class Classmate extends PureComponent {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.studentToken) {
      this.props.onGetClassmates(
        this.props.studentToken,
        this.props.data.branch.replace(" ", "-")
      );
    }
  }

  render() {
    return (
      <div className={classes.Classmate}>
        <SearchBar
            onChange={(e) => {
              advanceSearch(e, this.containerRef);
            }}
        />
        <div className={classes.ClassmateContainer} ref={this.containerRef}>
          {this.props.classmates.map((classmate) => (
              <article key={classmate._id}>
            <Card

              img={classmate.image}
              name={classmate.name}
              roll={classmate.roll}
              email={classmate.email}
              github={classmate.github}
              linkedin={classmate.linkedin}
              portfolio={classmate.portfolio}
            />
              </article>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    classmates: state.classmate.data,
    studentToken: state.auth.studentToken,
    data: state.profile.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetClassmates: (token, branch) => {
      dispatch(actionCreators.getClassmate(token, branch));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classmate);
