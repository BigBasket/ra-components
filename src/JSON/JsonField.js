import { FunctionField } from 'react-admin';
import React, { Component } from "react";

class JsonField extends Component {
  
    constructor(props) {
        super();
        this.props = props;
    }

  render() {

    const ViewJSON = (JsonObj) => {
      let retval = JsonObj;
      if (retval === JSON.stringify({})) 
          retval = '';
      if (retval && typeof retval === 'object')
        retval = JSON.stringify(retval).replaceAll(/([{},:])/g, ' $1 ');
      return retval;
    }

    let {label,source,json,...rest} = this.props;
    if (!json && !source) throw new Error(`Missing mandatory prop: json or source`);
    return <FunctionField render={record => {
      const data = json || record[source];
      if (!data) return <div></div>;
      const retVal = <div><p></p>{label}<p></p>{ViewJSON(data)}</div>;
      return retVal;
      }} 
    {...rest}/>
  }
}

export {JsonField};