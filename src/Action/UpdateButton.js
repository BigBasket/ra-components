import React from "react";
import { useUpdate, Button } from 'react-admin';

/**
 * A button to update specific column of a record.
 * Example: You can add a button to Approve a post.
 * @example
 * <UpdateButton resource='posts' label='Approve' source='is_approved'/>
 * 
 * In the above example, `is_approved` column of the curret record within`posts`, will be updated to`true`.
 * 
 * You can pass value prop to update the source to a specific value, instead of`true`.
 * @example
 * <UpdateButton resource='posts' label='Approve' source='post_status' value='APPROVED' />
 * 
 * You can also update two or more columns by passing json in data.
 * Approve the post and also update the status as APPROVED
 * @example 
 * const data = {is_approved:true,post_status:'APPROVED'};
 * <UpdateButton resource='posts' label='Approve' data={data} />
 * 
 * Note: You can send either source or data.if source is there, data is ignored.
 * 
 * By default, `UpdateButton` merges the un - updated data and updated data and sends the whole object.If your API expects only updated data, you can turn this off using merge prop.
 * @example
 * const data = {is_approved:true,post_status:'APPROVED'};
 * <UpdateButton resource='posts' label='Approve' data={data} merge={false}/>
 */
export const UpdateButton = ({ resource, source,value=true,data={},label='Update',merge=true,...props }) => {
    const record = props.record;
    resource = resource || props.basePath && props.basePath.split('/')[1];
    if (!resource) throw new Error(`Missing mandatory prop: resource`);
    if (!record) throw new Error(`Missing mandatory prop: record`);
    if (source) data = {[source]: value };
    if (!data) throw new Error(`Missing mandatory prop: source or data`);
    const newrecord = {}; 
    merge ? Object.assign(newrecord,record,data): Object.assign(newrecord,data);
    const [update, { loading,error }] = useUpdate(resource, record.id, newrecord, record);
    if (error) { return <p>ERROR</p>; } 
    return <Button variant="outlined" color="primary" label={label} onClick={update} disabled={loading} />;
}