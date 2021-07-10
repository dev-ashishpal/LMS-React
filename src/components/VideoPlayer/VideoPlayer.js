import React from "react";
import video from "../../assets/video/video.mp4";
import PlayerControls from "./PlayerControls/PlayerControls";
import sprite from "../../assets/svg/sprite.svg";
import classes from "./VideoPlayer.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.progressBarFilledRef = React.createRef();
    this.progressBarFilledLoadedRef = React.createRef();
    this.progressBarThumbRef = React.createRef();
    this.currentTimeRef = React.createRef();
    this.durationTimeRef = React.createRef();
    this.progressBarRef = React.createRef();
    this.fwdBtnRef = React.createRef();
    this.bkwBtnRef = React.createRef();
    this.playerRef = React.createRef();
    this.progressTimeRef = React.createRef();
  }

  state = {
    playPauseIcon: "#icon-play_arrow",
    showMiddleIcon: false,
    middleIcon: null,
    muteIcon: "#icon-volume_up",
    volume: 1,
    fullscreenIcon: "#icon-fullscreen",
    spinner: false,
  };

  removeMiddleIcon = () => {
    setTimeout(() => {
      this.setState({ showMiddleIcon: false });
    }, 300);
  };

  playPauseHandler = () => {
    if (this.videoRef.current.paused) {
      this.videoRef.current.play();
      this.setState({
        playPauseIcon: "#icon-pause",
        showMiddleIcon: true,
        middleIcon: "#icon-pause",
      });
      this.removeMiddleIcon();
    } else {
      this.videoRef.current.pause();
      this.setState({
        playPauseIcon: "#icon-play_arrow",
        showMiddleIcon: true,
        middleIcon: "#icon-play_arrow",
      });
      this.removeMiddleIcon();
    }
  };

  muteHandler = () => {
    this.videoRef.current.muted = !this.videoRef.current.muted;
    if (this.state.volume === null) {
      this.setState({ muteIcon: "#icon-volume_off" });
    }
    if (this.videoRef.current.muted) {
      this.setState({
        muteIcon: "#icon-volume_off",
        showMiddleIcon: true,
        middleIcon: "#icon-volume_off",
      });
      this.removeMiddleIcon();
    } else {
      this.setState({
        muteIcon: "#icon-volume_up",
        showMiddleIcon: true,
        middleIcon: "#icon-volume_up",
      });
      this.removeMiddleIcon();
    }
  };

  progressHandler = () => {
    const percent =
      (this.videoRef.current.currentTime / this.videoRef.current.duration) *
      100;
    this.progressBarFilledRef.current.style.width = `${percent}%`;
    this.progressBarThumbRef.current.style.left = `${percent}%`;
    this.progressBarThumbRef.current.style.transform = `translateX(-${percent}%)`;

    let currMin = Math.floor(this.videoRef.current.currentTime / 60);
    let currSec = Math.floor(this.videoRef.current.currentTime - currMin * 60);
    let durMin = Math.floor(this.videoRef.current.duration / 60);
    let durSec = Math.floor(this.videoRef.current.duration - durMin * 60);

    if (currSec < 10) {
      currSec = "0" + currSec;
    }
    if (currMin < 10) {
      currMin = "0" + currMin;
    }
    if (durSec < 10) {
      durSec = "0" + durSec;
    }

    this.currentTimeRef.current.innerHTML = `${currMin}:${currSec}`;
    this.durationTimeRef.current.innerHTML = `${durMin}:${durSec}`;
  };

  scrub = (e) => {
    this.videoRef.current.currentTime =
      (e.nativeEvent.offsetX / this.progressBarRef.current.offsetWidth) *
      this.videoRef.current.duration;
  };

  skipFwdHandler = () => {
    this.videoRef.current.currentTime += parseFloat(
      this.fwdBtnRef.current.dataset.skip,
    );
    this.setState({ showMiddleIcon: true, middleIcon: "#icon-forward_10" });
    this.removeMiddleIcon();
  };

  skipBwdHandler = () => {
    this.videoRef.current.currentTime += parseFloat(
      this.bkwBtnRef.current.dataset.skip,
    );
    this.setState({ showMiddleIcon: true, middleIcon: "#icon-replay_10" });
    this.removeMiddleIcon();
  };

  volumeSliderHandler = (e) => {
    this.videoRef.current.volume = +e.target.value;
    this.setState({ volume: e.target.value });
  };

  fullscreenHandler = () => {
    if (this.playerRef.current.requestFullscreen) {
      this.playerRef.current.requestFullscreen();
      this.setState({
        fullscreenIcon: "#icon-fullscreen",
        showMiddleIcon: true,
        middleIcon: "#icon-fullscreen",
      });
      this.removeMiddleIcon();
    }
    if (document.exitFullscreen) {
      document.webkitExitFullscreen();

      this.setState({
        fullscreenIcon: "#icon-fullscreen_exit",
        showMiddleIcon: true,
        middleIcon: "#icon-fullscreen_exit",
      });
      this.removeMiddleIcon();
    }
  };

  progressTimerHandler = (e) => {
    this.progressTimeRef.current.style.left = `${e.nativeEvent.offsetX}px`;
    const scrubTime =
      (e.nativeEvent.offsetX / this.progressBarRef.current.offsetWidth) *
      this.videoRef.current.duration;

    if (
      this.progressTimeRef.current.getBoundingClientRect().x +
        this.progressTimeRef.current.getBoundingClientRect().width >=
      this.videoRef.current.getBoundingClientRect().x +
        this.videoRef.current.getBoundingClientRect().width
    ) {
      this.progressTimeRef.current.style.left = `${
        this.progressBarRef.current.offsetWidth -
        (10 + this.progressTimeRef.current.offsetWidth / 2)
      }px`;
    }

    let scrubMin = Math.floor(scrubTime / 60);
    let scrubSec = Math.floor(scrubTime - scrubMin * 60);

    if (scrubSec < 10) {
      scrubSec = "0" + scrubSec;
    }
    if (scrubMin < 10) {
      scrubMin = "0" + scrubMin;
    }
    this.progressTimeRef.current.querySelector(
      "span",
    ).innerHTML = `${scrubMin}:${scrubSec}`;
    if (this.props.src) {
      this.progressTimeRef.current.querySelector(
        "video",
      ).currentTime = scrubTime ? scrubTime : null;
    }
  };

  spinnerShowHandler = () => {
    this.setState({ spinner: true });
  };

  spinnerCloseHandler = () => {
    this.setState({ spinner: false });
  };

  endedHandler = () => {
    this.videoRef.current.pause();
    this.setState({ playPauseIcon: "#icon-refresh1" });
  };

  progressLoadedTimerHandler = () => {
    let time = this.videoRef.current.currentTime;
    let range = 0;
    let bf = this.videoRef.current.buffered;
    if (this.videoRef.current.readyState >= 2) {
      while (!(bf.start(range) <= time && time <= bf.end(range))) {
        range += 1;
      }
      let end = (bf.end(range) / this.videoRef.current.duration) * 100;
      this.progressBarFilledLoadedRef.current.style.width = `${end}%`;
    }
  };

  render() {
    return (
      <div className={classes.Player} ref={this.playerRef}>
        <video
          src={this.props.src}
          className={classes.PlayerVideo}
          preload="auto"
          ref={this.videoRef}
          onTimeUpdate={this.progressHandler}
          onWaiting={this.spinnerShowHandler}
          onLoadStart={this.spinnerShowHandler}
          onCanPlay={this.spinnerCloseHandler}
          onEnded={this.endedHandler}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          onProgress={this.progressLoadedTimerHandler}
          // onLoadedData={this.spinnerCloseHandler}
          // onCanPlayThrough={this.spinnerCloseHandler}
          // onProgress={this.spinnerCloseHandler}
          //   onLoad={this.spinnerShowHandler}
        >
          Your browser doesn't support Video File.
        </video>
        <PlayerControls
          src={this.props.src}
          playPauseHandler={this.playPauseHandler}
          playPauseIcon={this.state.playPauseIcon}
          muteHandler={this.muteHandler}
          muteIconHandler={this.state.muteIcon}
          progressBarFilled={this.progressBarFilledRef}
          progressBarFilledLoaded={this.progressBarFilledLoadedRef}
          progressBarThumb={this.progressBarThumbRef}
          currentTimeRef={this.currentTimeRef}
          durationTimeRef={this.durationTimeRef}
          changeProgress={this.scrub}
          progressBarRef={this.progressBarRef}
          fwdRef={this.fwdBtnRef}
          bkwRef={this.bkwBtnRef}
          fwdBtn={this.skipFwdHandler}
          bkwBtn={this.skipBwdHandler}
          volumeSliderHandler={this.volumeSliderHandler.bind(this)}
          volume={this.state.volume}
          fullscreenHandler={this.fullscreenHandler}
          fullscreenIcon={this.state.fullscreenIcon}
          progressTimeRef={this.progressTimeRef}
          progressTimerHandler={this.progressTimerHandler}
        />
        {this.state.showMiddleIcon ? (
          <div className={classes.MiddleIcon}>
            <svg>
              <use href={sprite + this.state.middleIcon}></use>
            </svg>
          </div>
        ) : null}
        {this.state.spinner ? (
          <div className={classes.Spinner}>
            <Spinner />
          </div>
        ) : null}
      </div>
    );
  }
}

export default VideoPlayer;
