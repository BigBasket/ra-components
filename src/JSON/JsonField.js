import JSONTree from 'react-json-tree';
import React from "react";
import { Button } from '@material-ui/core';

  const ViewJSON = (JsonObj,treeview,expandview) => {
    if (JsonObj === JSON.stringify({})) return '';
    if (JsonObj && typeof JsonObj === 'object')
      return treeview ? 
        <JSONTree data={JsonObj} hideRoot shouldExpandNode={() => expandview}/> 
        : JSON.stringify(JsonObj).replaceAll(/([{},:])/g, ' $1 ');
    return '';
  }
  
  export const JsonField = ({label,source,json,togglelabel,expandlabel,collapselabel,treeview=true,record}) => {
    let treeBtn;let expandBtn;
    const [tree,setTree] = React.useState(treeview);
    const [expand,setExpand] = React.useState(false);
    if (!json && !source) throw new Error(`Missing mandatory prop: json or source`);
    const data = json || record[source];
    if (tree && expandlabel && collapselabel)
      expandBtn = <Button variant="contained" color="primary" size="small" onClick={() => setExpand(!expand)}>{expand?collapselabel:expandlabel}</Button>;
    
    if (treeview && togglelabel)
      treeBtn = <Button variant="contained" color="primary" size="small" onClick={() => setTree(!tree)}>{togglelabel}</Button>;
    
    const retVal = <div><p></p>{label}&nbsp;&nbsp;{treeBtn}&nbsp;&nbsp;{expandBtn}<p></p>{ViewJSON(data,tree,expand)}</div>;
    return retVal;
  }