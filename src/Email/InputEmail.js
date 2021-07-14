import * as React from 'react';
import { ArrayInput, SimpleFormIterator, TextInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import isEmail from 'validator/lib/isEmail';

const ERRORTEXT = 'Invalid email';
const SPLITCHAR = ',';

export const EmailTypes = {
    SINGLE: 'ct_single',
    MULTIPLE: 'ct_multiple',
    ARRAY: 'ct_array',
};

export default (props) => {

    const {source, type = EmailTypes.SINGLE, grouplabel = 'Emails', 
        splitchar = SPLITCHAR, validate = [], errortext = ERRORTEXT,
        wrap=true, domains = [], ...rest} = props;
    
    if (!source) throw new Error(`Missing mandatory prop: source`);

    const useIteratorStyle = makeStyles(() => ({
        root: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: wrap?'wrap':'inherit',
        },
        form: {
          width: '100%',
        },
        line: {
          border: 1,
        },
    }));

    const checkEmail = (value) => {
        if (!value) return false;
        if (Array.isArray(domains) && domains.length > 0)
            return checkEmailDomain(value);
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
        let isvalid = true;
        if (type === EmailTypes.MULTIPLE) {
            const values = value.split(splitchar);
            for (let i = 0; i < values.length; i++) {
                const email = values[i].trim();
                isvalid = checkEmail(email);
                if (!isvalid) break;
            }
        } 
        else {
            isvalid = checkEmail(value);
        }

        return isvalid ? undefined : errorobj;
    }

    let retComponent = null;
    const errorobj = {message: errortext};
    const classes = useIteratorStyle();
    validate.push(validateEmail);
    
    if (type === EmailTypes.ARRAY){
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
