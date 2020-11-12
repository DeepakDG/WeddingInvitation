import * as RNLocalize from 'react-native-localize';
//import I18n from 'i18n-js';
import I18n from 'i18n-js';

import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
// import { I18nManager } from 'react-native';

import en from './en';
import zh from './zh';
import vn from './vn';
import vi from './vi';
import kn from './kn';
import nl from './nl';

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.translations = {
  default: en,
  'en-US': en,
  en,
  vi,
  nl,
  'nl-NL': nl,
  zh,
  'vi-VN': vi,
  kn,
};

I18n.fallbacks = true;
export default I18n;
