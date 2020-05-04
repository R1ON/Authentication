import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import RegistrationFormContainer from './RegistrationFormContainer';

import { RussianFlagIcon, AmericanFlagIcon } from '../icons';
import russianLocale from '../../messages/ru.json';
import englishLocale from '../../messages/en.json';

const LOCALE: {[key: string]: string} = {
  ru: 'ru',
  en: 'en',
};

const App: React.FC = () => {
  const [locale, setLocale] = useState(LOCALE.ru);

  const changeLocaleHandler = (newLocale: string) => () => {
    if (newLocale !== locale) {
      setLocale(newLocale);
    }
  };

  let messages;

  switch (locale) {
    case LOCALE.ru: messages = russianLocale; break;
    case LOCALE.en: messages = englishLocale; break;
    default: messages = russianLocale;
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <header>
        <button type="button" onClick={changeLocaleHandler(LOCALE.ru)}>
          <RussianFlagIcon style={{ width: '20px' }} />
        </button>
        <button type="button" onClick={changeLocaleHandler(LOCALE.en)}>
          <AmericanFlagIcon style={{ width: '20px' }} />
        </button>
      </header>
      <RegistrationFormContainer />
    </IntlProvider>
  );
};

export default App;
