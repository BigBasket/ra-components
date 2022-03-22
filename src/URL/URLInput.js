import React from "react";
import { ArrayInput, SimpleFormIterator, TextInput } from 'react-admin';
import isURL from 'validator/lib/isURL';

const ERRORTEXT = 'Invalid URL';
const SPLITCHAR = ',';
const GROUPLABEL = 'URLs';
export const URLTypes = {
    SINGLE: 'ct_single',
    MULTIPLE: 'ct_multiple',
    ARRAY: 'ct_array',
};

/**
 * 
 * `URLInput` is used to validate if the entered value is an URL or not.
 * @example
 * <URLInput source='URL' label='URL' />
 * 
 * You can restrict the URL to a specific domain.
 * @example
 * <URLInput source='URL' label='URL' domains={['yourdomain.com']} />
 * 
 * MULTIPLE allows it to take comma separated URLs.  Or you can specify a separator.
 * @example
 * <URLInput source='URL' label='URLs' domains={['yourdomain.com']} type={URLTypes.MULTIPLE} splitchar=';'/>
 * 
 * In case of an invalid URLs, you can customize the error message using `errortext` prop.
 * 
 * **Notes for `URLTypes.ARRAY`**
 * - If you want to get array of URLs, please pass type as `URLTypes.ARRAY`.
 * - By default each of `URLInput` component is wrapped on the screen.  
 * - You can pass `wrap` as `false` to get each `URLInput` one below the other.
 * - `URLs` is the default label given to the array. Use `grouplabel` prop to override.
 * 
 */
export const URLInput = (props) => {

    const {source, type = URLTypes.SINGLE, grouplabel = GROUPLABEL, 
        splitchar = SPLITCHAR, validate = [], errortext = ERRORTEXT, httpAllowed = false,ftpAllowed = false, APIEndPoint = false,
        wrap=true, domains = [], ...rest} = props;
    
    if (!source) throw new Error(`Missing mandatory prop: source`);

    const checkURL = (value) => {
        if (!value) return false;
        if (APIEndPoint)
            return value.slice(0,1)==='/' ? true: false
        if (Array.isArray(domains) && domains.length > 0)
            if (!checkURLDomain(value)) return false;
        const protocols = [`https`];
        if (httpAllowed) protocols.push(`http`);
        if (ftpAllowed) protocols.push(`ftp`);
        return isURL(value,{protocols:protocols});
    }
    
    const checkURLDomain = (value) => {
        const urlstr = value.toString().trim();
        let domainmatch = false;
        for (let i=0; i< domains.length;i++){
            if (urlstr.includes(domains[i])) domainmatch = true; break;
        }
        return domainmatch;
    }

    const validateURL = (value) => {
        if (!value) return;
        let isvalid = true;
        const values = value.split(splitchar);
        for (let i = 0; i < values.length; i++) {
            const urlstr = values[i].trim();
            isvalid = checkURL(urlstr);
            if (!isvalid) break;
        }
        return isvalid ? undefined : errorobj;
    }

    let retComponent = null;
    const errorobj = {message: errortext};
    const sx = wrap ? {display:'flex',flexDirection:'row',flexWrap:'wrap',} : undefined;
    validate.push(validateURL);
    
    if (type === URLTypes.ARRAY){
        retComponent = (
            <ArrayInput source={source} label={grouplabel} >
                <SimpleFormIterator sx={sx}>
                    <TextInput validate={validate} {...rest} />
                </SimpleFormIterator>
            </ArrayInput>
        );
    }
    else
        retComponent = (
            <TextInput source={source} validate={validate} {...rest} />
        );

    return retComponent;
};
