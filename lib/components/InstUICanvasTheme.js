import axios from 'axios';
import Color from 'color';
import React, { Component, PropTypes } from 'react';
import {
  ApplyTheme,
  Button,
  Link,
  Tab,
} from 'instructure-ui';

const REQUIRED_VARS = [
  'ic-brand-primary',
  'ic-brand-button--primary-bgd',
  'ic-brand-button--primary-text',
  'ic-link-color',
];

function validateVars(vars) {
  if (!vars) {
    return false;
  }

  for (let i=0, l=REQUIRED_VARS.length; i<l; i++) {
    let key = REQUIRED_VARS[i];
    if (vars[key] == null) {
      valid = false;
      break;
    }
  }
  
  return true;
}

function prepareTheme(vars) {
  if (!validateVars(vars)) {
    return {};
  }

  const PRIMARY = vars['ic-brand-primary'];
  const BTN_PRIMARY_BG = vars['ic-brand-button--primary-bgd'];
  const BTN_PRIMARY_TEXT = vars['ic-brand-button--primary-text'];
  const LINK = vars['ic-link-color'];

  return {
    colorBrand: PRIMARY,

    [Tab.theme]: {
      fontSize: '0.8125rem',
      accordionBackgroundColorSelected: PRIMARY,
      accordionBorderColorSelected: darken(PRIMARY, 0.2),
      simpleTextColor: LINK,
    },

    [Link.theme]: {
      textColor: LINK,
    },

    [Button.theme]: {
      primaryBackground: BTN_PRIMARY_BG,
      primaryBorderColor: darken(BTN_PRIMARY_BG, 0.2),
      primaryTextColor: BTN_PRIMARY_TEXT,
      primaryBackgroundHover: darken(BTN_PRIMARY_BG, 0.1),
      primaryInnerBorderColor: darken(BTN_PRIMARY_BG, 0.35),
      linkTextColor: LINK,
    }
  };
}

function darken(color, percent) {
  return Color(color).darken(percent).hexString();
}

export default class InstUICanvasTheme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vars: null,
    };
  }

  componentWillMount() {
    if (!this.state.vars) {
      axios.get('http://127.0.0.1:8000/proxy', {
          params: {
            url: `${this.props.host}/api/v1/brand_variables`,
          }
        })
        .then((response) => {
          this.setState({
            vars: response.data,
          });
        })
        .catch((error) => {
          console.warn(error.message);
        });
    }
  }

  render() {
    return (
      <ApplyTheme theme={prepareTheme(this.state.vars)}>
        {this.props.children}
      </ApplyTheme>
    );
  }
}

InstUICanvasTheme.propTypes = {
  host: PropTypes.string.isRequired,
};
