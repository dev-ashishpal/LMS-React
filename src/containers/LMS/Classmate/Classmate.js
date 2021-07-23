import React, { PureComponent } from "react";
import classes from "./Classmate.module.css";
import * as actionCreators from "./store/actions";
import Card from "../../../components/Card/Card";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { advanceSearch } from "../../../util/search";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import PropTypes from "prop-types";

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
    const { classmates: classmatesData, error } = this.props;
    let classmates = <Spinner />;
    if (classmatesData) {
      classmates = classmatesData.map((classmate) => (
        <article key={classmate._id}>
          <Card
            img={classmate.image}
            name={classmate.name}
            roll={+classmate.roll} // "+" for converting to number
            email={classmate.email}
            github={classmate.github}
            linkedin={classmate.linkedin}
            portfolio={classmate.portfolio}
          />
        </article>
      ));
    }
    if (error) {
      classmates = (
        <div className={classes.Error}>
          Error while Fetching the Classmates. Reload!
        </div>
      );
    }

    return (
      <div className={classes.Classmate}>
        <SearchBar
          onChange={(e) => {
            advanceSearch(e, this.containerRef);
          }}
        />
        <div className={classes.ClassmateContainer} ref={this.containerRef}>
          <header className={classes.HiddenElement}>
            <h1>Classmate Page</h1>
          </header>
          {classmates}
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
    error: state.classmate.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetClassmates: (token, branch) => {
      dispatch(actionCreators.getClassmate(token, branch));
    },
  };
};

Classmate.propTypes = {
  studentToken: PropTypes.string,
  error: PropTypes.string,
  classmates: PropTypes.array,
  data: PropTypes.object,
  onGetClassmates: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Classmate);
