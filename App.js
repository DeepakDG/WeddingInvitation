import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ImageBackground,
} from "react-native";
import PropTypes from "prop-types";

class TypingText extends Component<{}> {
  constructor() {
    super();

    this.index = 0;

    this.typing_timer = -1;

    this.blinking_cursor_timer = -1;

    this.state = { text: "", blinking_cursor_color: "transparent" };
  }

  componentDidMount() {
    this.typingAnimation();
    this.blinkingCursorAnimation();
  }

  componentWillUnmout() {
    clearTimeout(this.typing_timer);

    this.typing_timer = -1;

    clearInterval(this.blinking_cursor_timer);

    this.blinking_cursor_timer = -1;
  }

  typingAnimation = () => {
    clearTimeout(this.typing_timer);

    this.typing_timer = -1;

    if (this.index < this.props.text.length) {
      if (this.refs.animatedText) {
        this.setState(
          { text: this.state.text + this.props.text.charAt(this.index) },
          () => {
            this.index++;

            this.typing_timer = setTimeout(() => {
              this.typingAnimation();
            }, this.props.typingAnimationDuration);
          }
        );
      }
    }
  };

  blinkingCursorAnimation = () => {
    this.blinking_cursor_timer = setInterval(() => {
      if (this.refs.animatedText) {
        if (this.state.blinking_cursor_color == "transparent")
          this.setState({ blinking_cursor_color: this.props.color });
        else this.setState({ blinking_cursor_color: "transparent" });
      }
    }, this.props.blinkingCursorAnimationDuration);
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text
          ref="animatedText"
          style={{
            color: this.props.color,
            fontSize: this.props.textSize,
            textAlign: "center",
            margin: this.props.margin,
            fontFamily: this.props.fontFamily,
          }}
        >
          {this.state.text}
          <Text style={{ color: this.state.blinking_cursor_color }}>|</Text>
        </Text>
      </View>
    );
  }
}
export default class Myapp extends Component<{}> {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 5000);
  }

  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require("./images/veerabhadra10.jpg")}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
      </View>
    );
    return (
      <View style={styles.MainContainer}>
        <ImageBackground
          source={require("./images/backgroundwal.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 150,
              fontSize: 20,
              color: "#ff0000",
              alignContent: "center",
            }}
          >
            ಶ್ರೀ ವೀರಭದ್ರಸ್ವಾಮಿ ಕೃಪಾ
          </Text>
          <TypingText text="With joyful hearts We request your presence at the Marriage ceremony uniting Sumalatha and Deepak, the 11th of Dec at 8:15 AM in the Morning At KH PATIL Marriage Hall APMC-YARD Gadag, Reception to follow" />

          {this.state.isVisible === true ? Splash_Screen : null}
        </ImageBackground>
        <TouchableHighlight style={styles.locationstyle} activeOpacity={0.5}>
          <Image
            source={require("./images/location.png")}
            style={styles.buttonImageIconStyle}
          />
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: "center",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  SplashScreen_ChildView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BCD4",
    flex: 1,
  },
  image: {
    flex: 1,
  },
  locationstyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor:"#f0f0f0",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  buttonImageIconStyle: {
    padding: 15,
    margin: 15,
    height: 30,
    width: 20,
    resizeMode: "stretch",
  },
});

TypingText.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.number,
  textSize: PropTypes.number,
  fontFamily: PropTypes.fontFamily,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number,
};

TypingText.defaultProps = {
  text: "Default Typing Animated Text.",
  color: "rgb(255,223,0)",
  margin: 40,
  textSize: 30,
  fontFamily: "Courgette.Regular",
  typingAnimationDuration: 50,
  blinkingCursorAnimationDuration: 190,
};
