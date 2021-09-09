# About

*Opensource components for react-admin.*
- Validating JSON in a textinput is made easy using `JsonInput`.  
- JSON object now looks pretty in `JsonField`.
- Data can be trimmed using `TrimField` while displaying in datagrid etc. 
- Validate emails, restrict for a specific set of domains using `EmailInput`.

**Supported react-admin versions:**

* React-Admin 3.x

# Installation

Install using npm:  `npm install --save @bb-tech/ra-components`

# Basic Usage

To use `ra-components` in your react-admin application, import the necessary package(s) into your js file.

```js
import {JsonInput,JsonField,TrimField} from '@bb-tech/ra-components';
```

2. Now you can use the controls in your code.
```js
<JsonInput source='config' label='JSON Config' />
```

# JsonInput

`JsonInput` validates if the entered value is JSON or not.
If entered value is not a invalid JSON, `JsonInput` will throw an error.  
Default error message is: `Invalid JSON` and can be overridden using `errortext` prop.
```js
<JsonInput source='config' label='JSON Config' errortext='Enter a valid JSON'/>
```

or use translate function:
```js
<JsonInput source='config' label={translate('resources.resource_name.fields.config')} errortext={translate('myroot.validate.json')}/>
```

By default, `JsonInput` parses and returns the entered string as object. Instead, to send string directly, please pass `parse` prop as `false`  
```js
<JsonInput source='config' label='JSON Config' parse={false}/>
```
# JsonField

Your JSON can be viewed in a tree structure using `JsonField` .
```js
<JsonField source='config' label='JSON Config' />
```

You can also set JSON text directly instead of using source prop.
```js
<JsonField json={jsonobj} label='JSON Object' />
```

If `treeview` is `false`, JSON is viewed as text, i.e., tweaked to add enough spaces so that it fits the screen.
```js
<JsonField json={jsonobj} label='JSON Object' treeview={false}/>
```

Also, if `togglelabel` is set, a button is shown additionally to toggle between `tree` and `text`.
```js
<JsonField json={jsonobj} label='JSON Object' togglelabel='Toggle-View'/>
```

If `expandlabel` and `collapselabel` are set, a button is shown additionally to toggle between `expand` and `collapse`.
```js
<JsonField json={jsonobj} label='JSON Object' expandlabel='Expand' collapselabel='Collapse'/>
```

# TrimField

Any `TextField` with more number of characters can be limited using `TrimField`.
```js
<TrimField source='field' label='Trimmed Field' />
```
By default, this trims the value to 30 chars and appends ... to the end.

You can customize it.
```js
<TrimField source='field' label='Trimmed Field' limit={40} trimstr='....' />
```

# EmailInput

`EmailInput` is used to validate if the entered value is an email or not.
```js
<EmailInput source='email' label='Email Address' />
```

You can restrict the email to a specific domain.
```js
<EmailInput source='email' label='Email Address' domains={['yourdomain.com']} />
```

MULTIPLE allows it to take comma separated email addresses.  Or you can specify a separator.
```js
<EmailInput source='email' label='Email Address' domains={['yourdomain.com']} type={EmailTypes.MULTIPLE} splitchar=';'/>
```

In case of an invalid email address, you can customize the error message using `errortext` prop.

**Notes for `EmailTypes.ARRAY`**
- If you want to get array of email addresses, please pass type as `EmailTypes.ARRAY`.
- By default each of `EmailInput` component is wrapped on the screen.  
- You can pass `wrap={false}` to get each `EmailInput` one below the other.
- 'Emails' is the default label given to the array. Use `grouplabel` prop to override.

# License

`ra-components` is licensed under [MIT License](./LICENSE.md), sponsored and supported by [BigBasket Tech](https://tech.bigbasket.com).
