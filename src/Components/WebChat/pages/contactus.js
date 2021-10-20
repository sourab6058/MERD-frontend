import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';

export default function contactus({handleLoginClicked}) {
  return (
    <div className="contact-option-container" onClick={handleLoginClicked}>
    <div className="chat-now">
      <div className="chat-icon-container"><ChatIcon className="icon chat-icon"/></div>
      <span> Chat Now </span>
    </div>
    </div>
  )
}
