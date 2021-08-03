import JSONTree from 'react-json-tree';
import React from "react";
import { Button } from '@material-ui/core';

  const ViewJSON = (JsonObj,treeview) => {
    if (JsonObj === JSON.stringify({})) return '';
    if (JsonObj && typeof JsonObj === 'object')
      return treeview ? <JSONTree data={JsonObj}/> : JSON.stringify(JsonObj).replaceAll(/([{},:])/g, ' $1 ');
    return '';
  }

  export const JsonField = ({label,source,json,togglelabel,treeview=true,record}) => {
    let btn;
    const [tree,setTree] = React.useState(treeview);
    if (!json && !source) throw new Error(`Missing mandatory prop: json or source`);
    const data = json || record[source];
    if (togglelabel)
      btn = <Button variant="contained" color="primary" size="small" onClick={() => setTree(value => !tree)}>{togglelabel}</Button>;
    const retVal = <div><p></p>{label}&nbsp;&nbsp;{btn}<p></p>{ViewJSON(data,tree)}</div>;
    return retVal;
  }