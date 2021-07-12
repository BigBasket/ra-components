import React, { Component } from "react";
import { FunctionField } from 'react-admin';

const DEFAULT_LIMITCHARS = 30;
const DEFAULT_TRIMSTR = '...';

class TrimField extends Component {
    constructor(props) {
      super();
      this.props = props;
    }

    render() {

    const TrimString = (str) => {
        let retval = str;
        if (retval && typeof retval ==='string')
            retval = (retval.length > limit) ? retval.slice(0, limit) + trimstr : retval;
        return retval;
    };

    const {source,text,limit = DEFAULT_LIMITCHARS, trimstr = DEFAULT_TRIMSTR, ...rest} = this.props;
    if (!text && !source) throw new Error(`Missing mandatory prop: text or source`);
    if (isNaN(Number(limit))) throw new Error(`Invalid prop value: limit must be a number`);
    return (
        <FunctionField render={(record) => { 
            const data = text || record[source];
            return TrimString(data, limit); }} 
        {...rest} />
    );
    }
  }
  
  export {TrimField};
