import React from 'react';
import { Card, CardTitle, CardText, FontIcon } from 'react-md';
import '../App.css';

const style = { maxWidth: 1024, marginBottom:24 };

const CardUsage = () => (
  <Card style={style} className="md-block-centered"  >
    <CardTitle title="How to use" subtitle="FW Cipher v0.1" />
    <CardText className="md-text-justify">
      <p>
        Choose the <code>key</code> (numeric), then enter the text you want to encode (or decode) on the text input below
      </p>      
    </CardText>
  </Card>
);

export default CardUsage;