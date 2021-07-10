import React, { Component, Fragment } from "react";
import classes from "./ChatBox.module.css";
import ChatForm from "../../../../components/ChatForm/ChatForm";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions";
import { required } from "../../../../util/validators";
import { timeSince } from "../../../../util/timeSince";
import MessageLog from "../../../../components/Message/MessageLog/MessageLog";
import { connect } from "react-redux";
import openSocket from "socket.io-client";
import { emojis } from "../../../../util/emoji";
import MenuDropdown from "../../../../components/UI/MenuDropdown/MenuDropdown";
import { positionMenuDropdown } from "../../../../util/menuDropdown";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import { userAgent } from "../../../../util/userAgent";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.menuEmojiDropdownRef = React.createRef();
    this.menuGiphyDropdownRef = React.createRef();
    this.giphyContainerRef = React.createRef();
    this.messageLogRef = React.createRef();
    this.chatContainerRef = React.createRef();
  }
  state = {
    message: {
      value: "",
      valid: false,
      touched: false,
      required,
    },
    imgFile: null,
    formIsValid: false,
    showEmojiMenu: false,
    showGiphyMenu: false,
    isGifActive: false,
    isStickerActive: false,
  };

  componentDidMount() {
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }
    const socket = openSocket(`http://${localhost}:8080`);
    if (this.props.teacherToken) {
      this.props.onGetMessage(
        "teacher",
        this.props.location.search.split("=")[1],
        this.props.userData.name,
        this.props.teacherToken
      );

      socket.on("message", (data) => {
        if (
          data.branch === this.props.location.search.split("=")[1] &&
          data.subject === this.props.userData.name
        ) {
          this.props.onAddMessage(data.message[0]);
        }
      });
    } else if (this.props.studentToken) {
      socket.on("message", (data) => {
        if (
          data.subject === this.props.location.search.split("=")[1] &&
          data.branch === this.props.userData.branch
        ) {
          this.props.onAddMessage(data.message[0]);
        }
      });

      this.props.onGetMessage(
        "student",
        this.props.userData.branch,
        this.props.location.search.split("=")[1],
        this.props.studentToken
      );
    }
    setTimeout(() => {
      if (this.messageLogRef.current) {
        this.messageLogRef.current.scrollIntoView();
      }
    }, 500);
    console.log("remounted!!!");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.messageLogRef.current.scrollIntoView({behavior: "smooth"});
  }

  onChangeImageHandler = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);
    data.append("userId", this.props.userData._id);
    if (this.props.teacherToken) {
      const branch = this.props.location.search.split("=")[1];
      const subject = this.props.userData.name;
      this.props.onPostingImg(
        this.props.teacherToken,
        "teacher",
        branch,
        subject,
        data
      );
    } else if (this.props.studentToken) {
      const branch = this.props.userData.branch;
      const subject = this.props.location.search.split("=")[1];
      this.props.onPostingImg(
        this.props.studentToken,
        "student",
        branch,
        subject,
        data
      );
    }
  };

  onChangedHandler = (e) => {
    const updatedMessage = { ...this.state.message };
    updatedMessage.value = e.target.value;
    updatedMessage.touched = true;
    updatedMessage.valid = required(updatedMessage.value);
    this.setState({ message: updatedMessage });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      msg: this.state.message.value,
      userId: this.props.userData._id,
    };

    if (this.props.teacherToken) {
      const branch = this.props.location.search.split("=")[1];
      const subject = this.props.userData.name;
      this.props.onPostingMessage(
        this.props.teacherToken,
        "teacher",
        branch,
        subject,
        data
      );
    } else if (this.props.studentToken) {
      const branch = this.props.userData.branch;
      const subject = this.props.location.search.split("=")[1];
      this.props.onPostingMessage(
        this.props.studentToken,
        "student",
        branch,
        subject,
        data
      );
    }
    this.emptyInputHandler();
  };

  emptyInputHandler = () => {
    const updatedMessage = { ...this.state.message };
    updatedMessage.value = "";
    this.setState({ message: updatedMessage });
  };

  onSubmitGiphy = (msg) => {
    const updatedMessage = { ...this.state.message };
    updatedMessage.value = msg;
    this.setState({ message: updatedMessage });
    this.closeGiphyDropdownHandler();
  };

  observerHandler = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && entries[0].intersectionRatio === 1) {
          // console.log("Is intersecting");
        }
      },
      {
        root: null,
        rootMargins: "0px",
        threshold: 0.4,
      }
    );
    observer.observe(this.giphyContainerRef.current.lastElementChild);
    // console.log(this.giphyContainerRef.current.lastElementChild)
  };

  showEmojiDropdownHandler = (e) => {
    this.setState({ showEmojiMenu: true });
    positionMenuDropdown(e, this.menuEmojiDropdownRef);
  };

  closeEmojiDropdownHandler = () => {
    this.menuEmojiDropdownRef.current.style.display = "none";
    this.setState({ showEmojiMenu: false });
  };

  showGiphyDropdownHandler = (e) => {
    this.setState({ showGiphyMenu: true });
    positionMenuDropdown(e, this.menuGiphyDropdownRef);
    this.getGiphyGif();
  };

  closeGiphyDropdownHandler = () => {
    this.menuGiphyDropdownRef.current.style.display = "none";
    this.setState({ showGiphyMenu: false });
  };

  getEmojiUniCode = (value) => {
    this.setState((prevState) => {
      const updatedMessage = { ...prevState.message };
      updatedMessage.value = `${prevState.message.value} ${value}`;
      return { message: updatedMessage };
    });
  };

  getGiphyGif = () => {
    this.props.onGetGiphy("gifs");
    this.setState({ isGifActive: true, isStickerActive: false });
  };

  getGiphySticker = () => {
    this.props.onGetGiphy("stickers");
    this.setState({ isGifActive: false, isStickerActive: true });
  };

  render() {
    let giphyData;
    if (this.props.giphyLoading) {
      giphyData = <Spinner />;
    } else if (this.props.giphyError) {
      giphyData = <div>it is an error.</div>;
    } else if (this.props.giphyData.data) {
      console.log(this.props.giphyData.data[0].title);
      giphyData = (
        <Fragment>
          {this.props.giphyData.data.map((element, idx) => (
            <img
              onClick={() => {
                this.onSubmitGiphy(element.images.downsized.url);
              }}
              className={classes.GiphySingle}
              key={idx}
              alt={element.title}
              src={element.images.fixed_width_downsampled.url}
              width={element.images.fixed_width_downsampled.width}
              height={element.images.fixed_width_downsampled.height}
            />
          ))}
        </Fragment>
      );
    }

    let gifActiveClass = [classes.GifBtn];
    let stickerActiveClass = [classes.StickerBtn];
    if (this.state.isGifActive) {
      gifActiveClass = [classes.GifBtn, classes.Active];
    } else if (this.state.isStickerActive) {
      stickerActiveClass = [classes.StickerBtn, classes.Active];
    }

    return (
      <Fragment>
        <main className={classes.ChatContainer} ref={this.chatContainerRef}>
          <div className={classes.ChatLog}>
            {this.props.messages.map((message) => (
              <MessageLog
                messageLogRef={this.messageLogRef}
                key={message._id}
                your={message.userName === this.props.userData.name}
                username={message.userName}
                image={message.userImage}
                date={timeSince(message.date)}
              >
                {message.msg}
              </MessageLog>
            ))}
          </div>
          {/*<div ref={this.messageLogRef}>&nbsp;</div>*/}
        </main>
        <MenuDropdown
          clicked={this.closeEmojiDropdownHandler}
          menuDropdownRef={this.menuEmojiDropdownRef}
          showMenu={this.state.showEmojiMenu}
        >
          <div className={classes.EmojiContainer}>
            {emojis.map((emoji, idx) => {
              return (
                <article
                  onClick={() => {
                    this.getEmojiUniCode(emoji.html);
                  }}
                  key={idx}
                  className={classes.EmojiSingle}
                >
                  {emoji.emoji}
                </article>
              );
            })}
          </div>
        </MenuDropdown>
        <MenuDropdown
          clicked={this.closeGiphyDropdownHandler}
          menuDropdownRef={this.menuGiphyDropdownRef}
          showMenu={this.state.showGiphyMenu}
        >
          <div ref={this.giphyContainerRef} className={classes.GiphyContainer}>
            <div className={classes.GiphyButtons}>
              <button
                className={gifActiveClass.join(" ")}
                onClick={this.getGiphyGif}
              >
                Trending Gif
              </button>
              <button
                className={stickerActiveClass.join(" ")}
                onClick={this.getGiphySticker}
              >
                Trending Stickers
              </button>
            </div>
            {giphyData}
          </div>
        </MenuDropdown>
        <ChatForm
          value={this.state.message.value}
          emoji={this.showEmojiDropdownHandler}
          giphy={this.showGiphyDropdownHandler}
          onChange={this.onChangedHandler}
          onSubmit={this.onSubmit}
          img={this.onChangeImageHandler}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
    userData: state.profile.data,
    giphyData: state.message.giphyData,
    giphyLoading: state.message.giphyLoading,
    giphyError: state.message.giphyError,
    messages: state.message.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostingMessage: (token, url, branch, subject, messageData) => {
      dispatch(
        actionCreators.postMessage(token, url, branch, subject, messageData)
      );
    },
    onPostingImg: (token, url, branch, subject, messageData) => {
      dispatch(
        actionCreators.postImgMessage(token, url, branch, subject, messageData)
      );
    },
    onGetGiphy: (url) => {
      dispatch(actionCreators.getGiphyTrending(url));
    },
    onGetMessage: (url, branch, subject, token) => {
      dispatch(actionCreators.getMessage(url, branch, subject, token));
    },
    onAddMessage: (data) => {
      dispatch(actionCreators.addMessage(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatBox));
