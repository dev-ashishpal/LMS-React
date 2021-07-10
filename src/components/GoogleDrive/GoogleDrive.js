import React, { Component } from "react";
import GooglePicker from "react-google-picker";

class GoogleDrive extends Component {
    state={
        data: null
    }
  render() {
    return (
      <GooglePicker
        clientId={
          "547991845560-ksedd8hpat4deob8svj5dskra2pjo7ie.apps.googleusercontent.com"
        }
        developerKey={"AIzaSyClEar0WTg1RX60LJHeCWp7TYtJM3v84ms"}
        scope={["https://www.googleapis.com/auth/drive.readonly"]}
        onChange={(data) => this.setState({data: data})}
        onAuthenticate={(token) => console.log("oauth token accessed")}
        onAuthFailed={(data) => console.log("oauth failed:")}
        multiselect={true}
        navHidden={true}
        authImmediate={false}
        mimeTypes={["image/png", "image/jpeg", "image/jpg", "video/mp4"]}
        viewId={"DOCS"}
      >
        {this.props.children}
      </GooglePicker>
    );
  }
}

export default GoogleDrive;
