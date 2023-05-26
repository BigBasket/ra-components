import React from "react";
import {JSONTree} from 'react-json-tree';
import { Button } from '@material-ui/core';
import {FunctionField} from 'react-admin';

const ViewJSON = (JsonObj,treeview,expandview) => {
  if (JsonObj === JSON.stringify({})) return '';
  if (JsonObj && typeof JsonObj === 'object')
    return treeview ? 
      <JSONTree data={JsonObj} hideRoot shouldExpandNode={() => expandview}/>
      : JSON.stringify(JsonObj).replaceAll(/([{},:])/g, ' $1 ');
  return '';
}

const GetJSON = (record,source) => {
  const sources = (source === `ALL`) ? Object.keys(record) : source.split(`,`);
  const retval = {};
  for (let i = 0; i < sources.length; i++)
      retval[sources[i]] = record[sources[i]];
  return retval;
}

/**
 * 
 * Your JSON can be viewed in a tree structure using `JsonField`.
 * 
 * @example
 *  <JsonField source='config' label='JSON Config' />
 * 
 * You can also set JSON text directly instead of using source prop.
 * @example
 * <JsonField json={jsonobj} label='JSON Object' />
 * 
 * If `treeview` is `false`, JSON is viewed as text, i.e., tweaked to add enough spaces so that it fits the screen.
 * @example
 * <JsonField json={jsonobj} label='JSON Object' treeview={false}/>
 * 
 * Also, if `togglelabel` is set, a button is shown additionally to toggle between `tree` and `text`.
 * @example
 * <JsonField json={jsonobj} label='JSON Object' togglelabel='Toggle-View'/>
 * 
 * If `expandlabel` and `collapselabel` are set, a button is shown additionally to toggle between `expand` and `collapse`.
 * @example
 * <JsonField json={jsonobj} label='JSON Object' expandlabel='Expand' collapselabel='Collapse'/>
 */
  export const JsonField = ({label,source,json,togglelabel,expandlabel,collapselabel,treeview=true,record, defaultExpand = true, styles = {}}) => {
    let treeBtn;let expandBtn;
    const [tree,setTree] = React.useState(treeview);
    const [expand,setExpand] = React.useState(defaultExpand);
    if (!json && !source) throw new Error(`Missing mandatory prop: json or source`);
    const data = json || GetJSON(record,source);
    if (!data) return null;
    if (tree && expandlabel && collapselabel)
      expandBtn = <Button variant="contained" color="primary" size="small" onClick={() => setExpand(!expand)}>{expand?collapselabel:expandlabel}</Button>;
    
    if (treeview && togglelabel)
      treeBtn = <Button variant="contained" color="primary" size="small" onClick={() => setTree(!tree)}>{togglelabel}</Button>;
    
    const retVal = <div style={styles}><p></p>{label}&nbsp;&nbsp;{treeBtn}&nbsp;&nbsp;{expandBtn}<p></p>{ViewJSON(data,tree,expand)}</div>;
    return <FunctionField render={() => retVal } /> ;
  }