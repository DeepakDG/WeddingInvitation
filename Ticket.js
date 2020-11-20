import React from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Triangle from "react-native-triangle";

const { height } = Dimensions.get("window");

const fontColour = "rgb(255,223,0)";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    height: 260,
    alignSelf: "stretch",
  },
  ticketTopContainer: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#bb1471",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#EEEEEE",
    borderBottomWidth: 1,
  },
  ticketBottomContainer: {
    flex: 2,
  },
  queueSummaryContainer: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: "#bb1471",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  acceptTicketContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#bb1471",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
  },
  subHeading: {
    fontWeight: "bold",
  },
  ticketSummary: {
    paddingTop: 5,
    justifyContent: "center",
  },
  ticketNumber: {
    textAlign: "right",
  },
  queueHeader: {
    paddingBottom: 4,
  },
  queueValue: {
    fontWeight: "bold",
    color: "rgb(255,223,0)",
  },
  greyText: {
    color: "rgb(255,223,0)",
  },
  lightGreyText: {
    color: "rgb(255,223,0)",
  },
  whiteText: {
    color: "rgb(255,223,0)",
  },
  notch: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  ticketNotchContainer: {
    bottom: -20,
  },
  ticketNotch: {
    backgroundColor: "#bb1471",
  },
  fontFamilyAll: {
    fontFamily: "Courgette.Regular",
    color: "rgb(255,223,0)",
    fontSize: 20,
    justifyContent: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  tinyKnot: {
    width: 250,
    height: 50,
    marginTop: 20,
  },
});

class Ticket extends React.Component {
  constructor(props) {
    super(props);

    this.ticketAcceptedAnimation = new Animated.Value(0);
    this.ticketHidingAnimation = new Animated.Value(0);

    this.ticketDragPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        if (!this.state.ticketTaken) {
          this.setState({ ticketTaken: true, ticketTimeRemaining: 5 }, () => {
            this.startTicketHidingCountdown();

            Animated.timing(this.ticketAcceptedAnimation, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            });
          });
        }
      },
    });

    this.state = {
      ticketTaken: false,
      ticketTimeRemaining: 0,
    };
  }

  startTicketHidingCountdown = () => {
    setTimeout(() => {
      const remainingTime = this.state.ticketTimeRemaining - 1;

      this.setState({
        ticketTimeRemaining: remainingTime,
        ticketTaken: remainingTime > 0,
      });

      if (remainingTime > 0) {
        this.startTicketHidingCountdown();
      }
    }, 1000);
  };

  render() {
    const { ticketTaken, ticketTimeRemaining } = this.state;
    const {
      ticketNumber,
      ticketDate,
      ticketTime,
      estimatedWaitTime,
      queuePosition,
    } = this.props;

    const ticketStyles = {
      transform: [
        {
          translateY: this.ticketAcceptedAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100],
          }),
        },
        {
          scale: this.ticketHidingAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ],
      opacity: this.ticketHidingAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
    };

    return (
      <View style={{ height: 1200 }}>
        <Animated.View style={[styles.container, ticketStyles]}>
          <Animated.View style={[styles.ticketTopContainer]}>
            <View style={[styles.flex, styles.ticketSummary]}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "#ffffff",
                  alignContent: "center",
                  fontFamily: "BalooTamma2-Regular",
                }}
              >
                {"||Shri Ganeshaya Namah||"}
              </Text>
              <Text style={styles.fontFamilyAll}>{"Our Wedding Day"}</Text>
              {/* <Text style={[styles.subHeading, styles.lightGreyText]}>
                {ticketDate}
              </Text>
              <Text style={[styles.subHeading, styles.lightGreyText]}>
                {ticketTime}
              </Text> */}
            </View>
            {/* <View style={styles.flex}>
              <Text
                style={[styles.heading, styles.ticketNumber, styles.greyText]}
              >
                {ticketNumber}
              </Text>
            </View> */}
          </Animated.View>

          <View style={styles.ticketBottomContainer}>
            <View style={styles.queueSummaryContainer}>
              <View>
                {/* <Text style={[styles.fontFamilyAll]}>Engagement</Text> */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* <View style={{ paddingRight: 8 }}>
                    <Icon name="md-people" color="#000000" size={32} />
                  </View> */}
                  <View>
                    <Text style={(styles.queueValue, styles.fontFamilyAll)}>
                      {queuePosition}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={[styles.fontFamilyAll]}>Marriage Date</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* <View style={{ paddingRight: 8 }}>
                    <Icon name="md-timer" color="#000000" size={32} />
                  </View> */}
                  <View>
                    <Text style={(styles.queueValue, styles.fontFamilyAll)}>
                      {estimatedWaitTime}
                      {/* <Text style={{ fontSize: 18 }}>min</Text> */}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              {...this.ticketDragPanResponder.panHandlers}
              style={styles.acceptTicketContainer}
            >
              <View>
                <Image
                  style={styles.tinyLogo}
                  source={require("./images/namaste.png")}
                />
              </View>
            </View>
          </View>

          <View>
            <Triangle
              width={310}
              height={100}
              color={"#bb1471"}
              direction={"down"}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default Ticket;
