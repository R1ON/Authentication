import React from 'react';
import { FormattedMessage } from 'react-intl';

const RegistrationFormContainer: React.FC = () => {
  return (
    <div className="registration">
      <div className="registration__form form">
        <div><FormattedMessage id="registration.title" /></div>
      </div>
    </div>
  );
};

export default RegistrationFormContainer;
