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
  I18nManager,
} from "react-native";
import I18n from "./i18n/locales";
import { Picker, Icon } from "native-base";
import PropTypes from "prop-types";
import { FloatingAction } from "react-native-floating-action";
import Printer from "./Printer";
import Ticket from "./Ticket";

const listLanguage = [
  { key: "kn", label: "Kannada" },
  { key: "en", label: "󠁧󠁢󠁥English" },
];

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
    text: "Venue",
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

export default class FirstPage extends Component<{}> {
  constructor() {
    super();
    this.state = {
      isVisible: true,
      ticketIndex: 1,
      startValue: new Animated.Value(0),
      endValue: 1,
      duration: 10000,
      languageSelected: "en",
    };
  }

  onChangeLanguage(languageSelected) {
    this.setState({
      languageSelected,
    });
    //this.props.setLanguageUser(value)
    I18n.locale = languageSelected;
    // _storeData(USER_LANGUAGE,value);
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
    }, 1000);

    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
  }
  static navigationOptions = {
    header: null,
    // title: 'Second Page',
    //Sets Header text of Status Bar
  };

  render() {
    const { languageSelected } = this.state;
    const ticketHeight = 400;
    const { navigate } = this.props.navigation;
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
                alignItems: "flex-end",
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
          <DropdownLanguage
            language={languageSelected}
            onChangeLanguage={this.onChangeLanguage.bind(this)}
          ></DropdownLanguage>
          <TypingText text={I18n.t("hompage.welcome")} />
          {/* <Text style={styles.paragraph}>{I18n.t("hompage.description")}</Text> */}
          {/* <TypingText
            text={
              "With joyful hearts We request your presence at the Marriage ceremony uniting Sumalatha D/o MRS.Shailaja MR.Chamarasaswamy\n WITH \nDeepak S/o MRS. Gurudevi & MR. Danayya V.Ganachari"
            }
          /> */}
          {this.state.isVisible === true ? Splash_Screen : null}
        </ImageBackground>
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            if (name === "btn_location") {
              navigate("SecondPage");
            } else if (name === "btn_familyInfo") {
              navigate("FamilyInfo");
            } else if (name === "btn_language") {
            }
            console.log(`selected button: ${name}`);
          }}
        />
      </View>
    );
  }
}

class DropdownLanguage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.dropdownLanguage}>
        {/* <Text style={{ width: 70, color: "white" }}>
          {I18n.t("hompage.language")}:{" "}
        </Text> */}
        <Picker
          mode="dialog"
          iosHeader={""}
          style={{ width: undefined, height: 40 }}
          selectedValue={this.props.language}
          onValueChange={this.props.onChangeLanguage.bind(this)}
        >
          {listLanguage.map((languageItem, i) => {
            return (
              <Picker.Item
                key={i}
                value={languageItem.key}
                label={languageItem.label}
              />
            );
          })}
        </Picker>
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
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  dropdownLanguage: {
    width: 140,
    height: 30,
    position: "absolute",
    alignSelf: "flex-end",
    borderColor: "red",
    backgroundColor: "white",
    borderWidth: 1,
    color: "#FFFFFF",
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
  text: I18n.t("hompage.welcome"),
  color: "rgb(255,223,0)",
  marginTop: 100,
  marginHorizontal: 30,
  textSize: 30,
  fontFamily: "Courgette.Regular",
  typingAnimationDuration: 150,
  blinkingCursorAnimationDuration: 450,
};
