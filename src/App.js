import React, {
  Component
} from 'react';
import {
  NavigationDrawer,
  TextField,
  FontIcon,
  Divider,
  Card,
  Button,
  Snackbar
} from 'react-md';
import CardUsage from './components/card_usage';
import logo from './logo.svg';
import './App.css';

const navlistitem = [{
  key: 'app',
  primaryText: 'App',
  leftIcon: <FontIcon>dashboard</FontIcon>,
  active: true,
}, { key: 'divider', divider: true }, {
  key: 'about',
  primaryText: 'About',
  leftIcon: <FontIcon>info</FontIcon>,
}];

class App extends Component {
  constructor() {
    super();
    this.state = {
      key: 0,
      result: '',
      toasts: [], autohide: true
    }

    this.navlinks = navlistitem.map((item) => {
      if (item.divider) {
        return item;
      }

      return {
        ...item,
        onClick: () => this.addToast(item.key+' link is not implemented yet'),
      };
    });
  }

  // Functions

  addToast = (text, action, autohide = true) => {
    this.setState((state) => {
      const toasts = state.toasts.slice();
      toasts.push({ text, action });
      return { toasts, autohide };
    });
  };

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };
  
  copyToClipboard(){
    document.getElementById('encodeResult').select(); 
    document.execCommand('copy');
    // alert(this.state.result);
    this.addToast('Result copied to clipboard');
  }

  clearInput(){
    document.getElementById('textToEncode').select();
    document.execCommand('delete');
    this.setState({result:""});
    this.addToast('Cleared input');
  }

  setKey(e) {
    this.setState({
      key: parseInt(e, 10)
    }, () => {
      this.encode()
    });

  }

  encode() {

    let rawTxt = document.getElementById('textToEncode').value;
    if (rawTxt === '') {
      this.setState({
        result: ""
      })
      return;
    }

    let key = this.state.key;

    if (key < 0) {
      key = 26 + (key % 26);
    }

    let rawTxtArray = rawTxt.split('');
    for (let i = 0; i < rawTxtArray.length; i++) {
      let charCode = rawTxtArray[i].charCodeAt();
      if (rawTxtArray[i] >= 'A' && rawTxtArray[i] <= 'Z') {
        rawTxtArray[i] = String.fromCharCode(
          ((charCode + key - 'A'.charCodeAt()) % 26) + 'A'.charCodeAt()
        );
      } else if (rawTxtArray[i] >= 'a' && rawTxtArray[i] <= 'z') {
        rawTxtArray[i] = String.fromCharCode(
          ((charCode + key - 'a'.charCodeAt()) % 26) + 'a'.charCodeAt()
        );
      }
    }
    let encoded = rawTxtArray.join('');

    this.setState({
      result: encoded
    })
  }

  render() {
      let result = this.state.result;
      return ( 
      <NavigationDrawer 
        drawerTitle = "Menu"
        toolbarTitle = "FW Cipher React Version"
        contentClassName = "md-grid"
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.FULL_HEIGHT}
        navItems={this.navlinks}
        style={{backgroundImage:'url("https://s3.amazonaws.com/tinycards/image/20d3384eeaa16be40a5d569aa5d29392")'}}>
        
        <div className = "App" >
        <CardUsage />
        <Card style = {
            {
              maxWidth: 1024
            }
          }
          className = "md-block-centered md-grid" >
          <TextField className = "md-cell md-cell--12"
            id = "keyInput"
            label = "Key"
            type = "number"
            leftIcon = { <FontIcon> vpn_key </FontIcon>}
            size = {10}
            fullWidth = {false}
            placeholder = '0'
            onChange = {this.setKey.bind(this)}
            />   
            <div className="md-grid">   
            <TextField className = "md-cell md-cell--6"
              id = "textToEncode"
              label = "Text to Encode"
              leftIcon = { <FontIcon> lock_open </FontIcon>}
              rows = {1}
              onChange = {this.encode.bind(this)}
              helpOnFocus
              helpText="If you want to decode text, make the key negative (-)."
              inlineIndicator={<Button icon secondary className="text-fields__inline-btn" onClick={this.clearInput.bind(this)}>clear</Button>}
              />       
            <TextField className = "md-cell md-cell--6"
              id = "encodeResult"
              label = "Encoded Text"
              leftIcon = { <FontIcon> lock </FontIcon>}
              value = {result}
              rows = {1}
              inlineIndicator={<Button icon primary className="text-fields__inline-btn" onClick={this.copyToClipboard.bind(this)}>content_copy</Button>}
              
              /> 
              </div>
          </Card> 
          <Snackbar
          id="snackbar"
          toasts={this.state.toasts}
          autohide={this.state.autohide}
          onDismiss={this.dismissToast}
        />
        </div> 
      </NavigationDrawer>
              );
            }
          }

          export default App;