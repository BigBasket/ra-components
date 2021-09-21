import React, { Component } from "react";
import { FunctionField } from 'react-admin';

const DEFAULT_LIMITCHARS = 30;
const DEFAULT_TRIMSTR = '...';

class TrimField extends Component {
    constructor(props) {
      super();
      this.props = props;
    }

    /**
     * Any `TextField` with more number of characters can be limited using `TrimField`.
     * @example
     * <TrimField source='field' label='Trimmed Field' />
     * 
     * By default, this trims the value to 30 chars and appends ... to the end.
     * You can customize it.
     * @example
     * <TrimField source='field' label='Trimmed Field' limit={40} trimstr='....' />
     *
     */
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
