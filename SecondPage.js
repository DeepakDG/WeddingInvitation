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
  ScrollView,
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

export default class SecondPage extends Component<{}> {
  constructor() {
    super();
    this.state = {
      isVisible: true,
      ticketIndex: 1,
      startValue: new Animated.Value(0),
      endValue: 1,
      duration: 10000,
    };
  }

  componentDidMount() {
    var that = this;
  }
  static navigationOptions = {
    // header: null
    title: "TIMINGS & VENUE",
    headerTintColor: "#FFDF00",
    headerStyle: {
      backgroundColor: "#bb1471",
      borderBottomColor: "#FFDF00",
      borderBottomWidth: 3,
    },
    headerTitleStyle: {
      fontSize: 18,
    },
    //Sets Header text of Status Bar
  };

  render() {
    const ticketHeight = 400;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.MainContainer}>
        <ImageBackground
          source={require("./images/bg.jpg")}
          style={{ width: "100%", height: "100%", marginTop:2 }}
        >
          <Text
            style={{
              marginTop: 80,
              textAlign: "center",
              fontSize: 18,
              color: "#FFDF00",
              alignContent: "center",
              fontFamily: "BalooTamma2-Regular",
              fontWeight: "bold",
            }}
          >
            {" "}
            Timings & Venue :{" "}
          </Text>
          <ScrollView>
            <TypingText
              text={
                "On Friday 11-12-2020 @ 12.16 p.m. Onwards,\nAt K.H Patil Sabha Bhavan\nA.P.M.C Yard,\nGadag, Karnataka"
              }
            />
          </ScrollView>
        </ImageBackground>
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
  marginTop: 40,
  marginHorizontal: 30,
  textSize: 22,
  fontFamily: "Courgette.Regular",
  typingAnimationDuration: 50,
  blinkingCursorAnimationDuration: 450,
};
