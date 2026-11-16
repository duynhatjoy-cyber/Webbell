import React from 'react';
import { getCurrentLang, subscribeLang, translateReactNode, translateText } from './i18n';

export class DCLogic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    const origDidMount = this.componentDidMount ? this.componentDidMount.bind(this) : null;
    const origWillUnmount = this.componentWillUnmount ? this.componentWillUnmount.bind(this) : null;
    const origRender = this.render ? this.render.bind(this) : null;

    this.componentDidMount = () => {
      if (origDidMount) origDidMount();
      this._viTitle = document.title;
      if (getCurrentLang() === 'en' && this._viTitle) {
        document.title = translateText(this._viTitle, 'en');
      }
      this._unsubLang = subscribeLang((lang) => {
        if (this._viTitle) {
          document.title = lang === 'en' ? translateText(this._viTitle, 'en') : this._viTitle;
        }
        this.forceUpdate();
      });
    };

    this.componentWillUnmount = () => {
      if (this._unsubLang) {
        this._unsubLang();
        this._unsubLang = null;
      }
      if (origWillUnmount) origWillUnmount();
    };

    if (origRender) {
      this.render = () => {
        const tree = origRender();
        return translateReactNode(tree, getCurrentLang());
      };
    }
  }

  renderVals() {
    return {};
  }
}
