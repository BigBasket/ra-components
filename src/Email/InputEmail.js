import React from "react";
import { ArrayInput, SimpleFormIterator, TextInput } from 'react-admin';
import isEmail from 'validator/lib/isEmail';

const ERRORTEXT = 'Invalid email';
const SPLITCHAR = ',';
const GROUPLABEL = 'Emails';
export const EmailTypes = {
    SINGLE: 'ct_single',
    MULTIPLE: 'ct_multiple',
    ARRAY: 'ct_array',
};

/**
 * 
 * `EmailInput` is used to validate if the entered value is an email or not.
 * @example
 * <EmailInput source='email' label='Email Address' />
 * 
 * You can restrict the email to a specific domain.
 * @example
 * <EmailInput source='email' label='Email Address' domains={['yourdomain.com']} />
 * 
 * MULTIPLE allows it to take comma separated email addresses.  Or you can specify a separator.
 * @example
 * <EmailInput source='email' label='Email Address' domains={['yourdomain.com']} type={EmailTypes.MULTIPLE} splitchar=';'/>
 * 
 * In case of an invalid email address, you can customize the error message using `errortext` prop.
 * 
 * **Notes for `EmailTypes.ARRAY`**
 * - If you want to get array of email addresses, please pass type as `EmailTypes.ARRAY`.
 * - By default each of `EmailInput` component is wrapped on the screen.  
 * - You can pass `wrap` as `false` to get each `EmailInput` one below the other.
 * - `Emails` is the default label given to the array. Use `grouplabel` prop to override.
 * 
 */
export const EmailInput = (props) => {

    const {source, type = EmailTypes.SINGLE, grouplabel = GROUPLABEL, 
        splitchar = SPLITCHAR, validate = [], errortext = ERRORTEXT,
        wrap=true, domains = [], ...rest} = props;
    
    if (!source) throw new Error(`Missing mandatory prop: source`);

    const checkEmail = (value) => {
        if (!value) return false;
        if (Array.isArray(domains) && domains.length > 0)
            if (!checkEmailDomain(value)) return false;
        return isEmail(value);
    }

    const checkEmailDomain = (value) => {
        const email = value.toString().trim();
        if (!value.includes('@') && domains.includes(value)) return true;
        const values = email.split('@');
        const name = values[0]; const domain = values[1];
        if (name && domain && domains.includes(domain))
            return true;
        return false;
    }

    const validateEmail = (value) => {
        if (!value) return;
        if (Array.isArray(value) && value.length<=0) return;
        let isvalid = true;
        const values = value.split(splitchar);
        for (let i = 0; i < values.length; i++) {
            const email = values[i].trim();
            isvalid = checkEmail(email);
            if (!isvalid) break;
        }
        return isvalid ? undefined : errorobj;
    }

    let retComponent = null;
    const errorobj = {message: errortext};
    const sx = wrap ? {display: 'inline',flexDirection:'row',flexWrap:'wrap'} : undefined;
    validate.push(validateEmail);
    
    if (type === EmailTypes.ARRAY){
        retComponent = (
            <ArrayInput source={source} label={grouplabel} >
                <SimpleFormIterator sx={sx} inline>
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
