import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  Animated,
  Button,
} from "react-native";
import PropTypes from "prop-types";
import { FloatingAction } from "react-native-floating-action";
import Printer from "./Printer";
import Ticket from "./Ticket";

const actions = [
  {
    text: "Family-info",
    icon: require("./images/info_icon.png"),
    name: "btn_familyInfo",
    position: 1,
  },
  {
    text: "Language",
    icon: require("./images/language_icon.png"),
    name: "btn_language",
    position: 2,
  },
  {
    text: "Location",
    icon: require("./images/location_icon.png"),
    name: "btn_location",
    position: 3,
  },
  // {
  //   text: "Video",
  //   icon: require("./images/location.png"),
  //   name: "bt_videocam",
  //   position: 4,
  // },
];

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
            marginTop: this.props.marginTop,
            marginHorizontal: this.props.marginHorizontal,
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
      ticketIndex: 1,
      startValue: new Animated.Value(0),
      endValue: 1,
      duration: 5000,
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
    }, 500000);

    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const ticketHeight = 400;
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          {/* <Image
            source={require("./images/veerabhadra10.jpg")}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          /> */}
          <Printer key={this.state.ticketIndex} ticketHeight={ticketHeight}>
            <Ticket
              height={ticketHeight}
              // ticketNumber={25}
              // ticketDate="Welcome to Wedding Ceremony"
              // ticketTime="01:07"
              estimatedWaitTime="11th Dec"
              queuePosition="10th Dec"
              onTicketTaken={() => {
                this.setState({ ticketIndex: this.state.ticketIndex + 1 });
              }}
            />
          </Printer>
          <View
            style={{
              width: "100%",
              flex: 1,
              flexDirection: "row",
              position: "absolute",
              bottom: 0,
            }}
          >
            <View
              style={{
                flex: 1,
                width: "50%",
                height: "80%",
                alignItems: "flex-start",
              }}
            >
              <Animated.View style={[{ opacity: this.state.startValue }]}>
                <Image
                  style={styles.tinyLogo}
                  source={require("./images/groom.png")}
                />
              </Animated.View>
            </View>
            <View
              style={{
                flex: 1,
                width: "50%",
                height: "80%",
                alignItems:"flex-end"
              
              }}
            >
              <Animated.View style={[{ opacity: this.state.startValue }]}>
                <Image
                  style={styles.tinyLogo}
                  source={require("./images/bride.png")}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    );
    return (
      <View style={styles.MainContainer}>
        <ImageBackground
          source={require("./images/bg.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              fontSize: 20,
              color: "#ffffff",
              alignContent: "center",
              fontFamily: "BalooTamma2-Regular",
            }}
          >
            ಶ್ರೀ ವೀರಭದ್ರಸ್ವಾಮಿ ಕೃಪಾ
          </Text>
          <TypingText
            text={
              "With joyful hearts We request your presence at the Marriage ceremony uniting Sumalatha D/o MRS.Shailaja MR.Chamarasaswamy\n WITH \nDeepak S/o MRS. Gurudevi & MR. Danayya\n\nVENUE : \nKH PATIL Marriage Hall APMC-YARD Gadag"
            }
          />
          {this.state.isVisible === true ? Splash_Screen : null}
        </ImageBackground>
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            console.log(`selected button: ${name}`);
          }}
        />
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
    backgroundColor: "#F8C0B5",
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

TypingText.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  marginTop: PropTypes.number,
  marginHorizontal: PropTypes.number,
  textSize: PropTypes.number,
  fontFamily: PropTypes.fontFamily,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number,
};

TypingText.defaultProps = {
  text: "Default Typing Animated Text.",
  color: "rgb(255,223,0)",
  marginTop: 100,
  marginHorizontal: 30,
  textSize: 30,
  fontFamily: "Courgette.Regular",
  typingAnimationDuration: 50,
  blinkingCursorAnimationDuration: 250,
};
