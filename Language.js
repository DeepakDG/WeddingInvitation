import * as React from 'react';
import { I18nManager,Text, View, StyleSheet } from 'react-native';
import I18n from './i18n/locales'

import { Picker,Icon } from "native-base"

 
const listLanguage = [
  {key:'en', label:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'}, {key:'vi', label:'🇻🇳'} ,{label: '🇳🇱', key:'nl'}, {label:'🇨🇳', key:'zh'}, {label:'🇰🇷', key:'ko'}
]

export default class Language extends React.Component {
constructor(props) {
    super(props)
    this.state = {
     languageSelected: 'en'
    }
  }
   onChangeLanguage(languageSelected){
    this.setState({
      languageSelected
    })
      //this.props.setLanguageUser(value)
      I18n.locale = languageSelected 
     // _storeData(USER_LANGUAGE,value);
  }
  render() {
    const {languageSelected} = this.state
    return (
      <View style={styles.container}>
              <DropdownLanguage language={languageSelected} onChangeLanguage={this.onChangeLanguage.bind(this)}></DropdownLanguage>
       <Text style={styles.title}>
         {I18n.t('hompage.welcome')}
        </Text>
        <Text style={styles.paragraph}>
          {I18n.t('hompage.description')}
        </Text>
      </View>
    );
  }
}
class DropdownLanguage extends React.Component {
  constructor(props) {
    super(props)  
  }
  
  render() {
    return (<View style={styles.dropdownLanguage}>
              <Text style={{width:70,}}>{I18n.t('hompage.language')}: </Text>
              <Picker
                mode="dropdown"
                iosHeader={''} 
                style={{ width: undefined,height:40,}}
                selectedValue={this.props.language}
                onValueChange={this.props.onChangeLanguage.bind(this)}
              >
                {listLanguage.map((languageItem, i) => {
                    return <Picker.Item key={i} value={languageItem.key} label=         {languageItem.label} />
                })}
              </Picker>
            </View>
)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
   title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownLanguage :{
    width:110, height:50, position:'absolute',top:10,right:10, flexDirection:'row',flex:1,justifyContent: "center",alignItems: "center"
  },
  
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
