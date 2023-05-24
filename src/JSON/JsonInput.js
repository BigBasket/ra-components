import React from "react";
import { TextInput } from "react-admin";
import isJSON from "validator/lib/isJSON";

const DEFAULT_ERRORTEXT = "Invalid JSON";

const parseFunction = (json) => {
    return json && JSON.parse(json);
  }
  catch (e) { return json; }
}

/**
 *
 * `JsonInput` validates if the entered value is JSON or not. If entered value is not a invalid JSON, `JsonInput` will throw an error.
 * Default error message is: `Invalid JSON` and can be overridden using `errortext` prop.
 *
 * @example
 * <JsonInput source='config' label='JSON Config' errortext='Enter a valid JSON'/>
 *
 * or use translate function:
 *
 * @example
 * <JsonInput source='config' label={translate('resources.resource_name.fields.config')} errortext={translate('myroot.validate.json')}/>
 *
 * By default, `JsonInput` parses and returns the entered string as object. Instead, to send string directly, please pass `parse` prop as `false`
 *
 * @example
 * <JsonInput source='config' label='JSON Config' parse={false}/>
 */
export const JsonInput = (props) => {
  const { validate = [], 
    errortext = DEFAULT_ERRORTEXT, 
    fullWidth = true, 
    resettable = false, 
    multiline = true, 
    parse = true,
     ...rest } = props;
  const errorobj = { message: errortext };
  const validateJSON = (value) => {
    if (!value || typeof value === 'object')
      return undefined;
    return isJSON(value) ? undefined : errorobj;
  }

  const formatJSON = (json) => {
    let retval = json;
    if (retval && typeof retval === 'object')
      retval = JSON.stringify(retval);
    return retval;
  };
  const cProps = {
    fullWidth: fullWidth,
    resettable: resettable,
    multiline: multiline,
    validate: validate,
    format: formatJSON,
  }; 
  if (parse) cProps.parse = parseFunction;
  validate.push(validateJSON);
  return (
    <TextInput {...cProps} {...rest} />
  );
}
