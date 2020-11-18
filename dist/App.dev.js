"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNavigation = require("react-navigation");

var _reactNavigationStack = require("react-navigation-stack");

var _FirstPage = _interopRequireDefault(require("./FirstPage"));

var _SecondPage = _interopRequireDefault(require("./SecondPage"));

var _FamilyInfo = _interopRequireDefault(require("./FamilyInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//This is an example code for Navigator// 
//import react in our code. 
//Import react-navigation
//import all the screens we are going to switch 
var App = (0, _reactNavigationStack.createStackNavigator)({
  //Constant which holds all the screens like index of any book 
  FirstPage: {
    screen: _FirstPage["default"]
  },
  //First entry by default be our first screen if we do not define initialRouteName
  SecondPage: {
    screen: _SecondPage["default"]
  },
  FamilyInfo: {
    screen: _FamilyInfo["default"]
  }
} // {
// initialRouteName: 'FirstPage',
// }
);

var _default = (0, _reactNavigation.createAppContainer)(App);

exports["default"] = _default;