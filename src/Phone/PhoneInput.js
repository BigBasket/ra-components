import * as React from 'react';
import { ArrayInput, SimpleFormIterator, TextInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import parsePhoneNumber from 'libphonenumber-js';

const ERRORTEXT = 'Invalid Phone';
const SPLITCHAR = ',';
const GROUPLABEL = 'Phone Numbers';
export const PhoneTypes = {
    SINGLE: 'ct_single',
    MULTIPLE: 'ct_multiple',
    ARRAY: 'ct_array',
};

/**
 * 
 * `PhoneInput` is used to validate if the entered value is a valid phone number or not.
 * @example
 * <PhoneInput source='phone' label='Phone Number' />
 * 
 * You can restrict to phone numbers of specific country by using the `country` prop.
 * @example
 * <PhoneInput source='phone' label='Phone Number' country='IND' />
 * 
 * MULTIPLE allows it to take comma separated phone numbers.  Or you can specify a separator.
 * @example
 * <PhoneInput source='phone' label='Phone Number' type={PhoneTypes.MULTIPLE} splitchar=';'/>
 * 
 * In case of an invalid phone number, you can customize the error message using `errortext` prop.
 * 
 * **Notes for `PhoneTypes.ARRAY`**
 * - If you want to get array of phone numbers, please pass type as `PhoneTypes.ARRAY`.
 * - By default each of `PhoneInput` component is wrapped on the screen.  
 * - You can pass `wrap` as `false` to get each `PhoneInput` one below the other.
 * - `Phone Numbers` is the default label given to the array. Use `grouplabel` prop to override.
 * 
 */
export default (props) => {

    const {source, type = PhoneTypes.SINGLE, grouplabel = GROUPLABEL, 
        splitchar = SPLITCHAR, validate = [], errortext = ERRORTEXT,
        wrap=true, country, ...rest} = props;
    
    if (!source) throw new Error(`Missing mandatory prop: source`);

    const useIteratorStyle = makeStyles(() => ({
        root: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        form: {
          width: '100%',
        },
        line: {
          border: 1,
        },
    }));

    const validatePhone = (value) => {
        if (!value) return;
        let isvalid = true;
        const values = value.split(splitchar);
        for (let i = 0; i < values.length; i++) {
            const phone = values[i].trim();
            const phonenum = parsePhoneNumber(phone,country);
            isvalid = phonenum && phonenum.isValid();
            if (!isvalid) break;
        }
        return isvalid ? undefined : errorobj;
    }

    let retComponent = null;
    const errorobj = {message: errortext};
    const classes = wrap ? useIteratorStyle() : undefined;
    validate.push(validatePhone);
    
    if (type === PhoneTypes.ARRAY){
        retComponent = (
            <ArrayInput source={source} label={grouplabel} >
                <SimpleFormIterator classes={classes}>
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
