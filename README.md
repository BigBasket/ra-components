# ra-components

*JsonInput and JsonField for react-admin.*

Validating JSON in a textinput is made easy using JsonInput.  
Also, JSON object now looks pretty in JsonField.

**Supported react-admin versions:**

* React-Admin 3.x

# Installation

Install using npm:

`npm install --save @bb-tech/ra-components`

# Basic Usage

To use `ra-components` in your react-admin application:

1. Import the necessary package(s) into your js file.

```js
import {JsonInput,JsonField,TrimField} from '@bb-tech/ra-components';
```

2. Now use the regular TextInput props for JsonInput.

```js
<JsonInput source='config' label='JSON Config' />
```

This will automatically validate if the entered value is JSON or not.
If not, JsonInput will throw an error.  
Default error message is: `Invalid JSON` and can be overridden using `errortext` prop.

```js
<JsonInput source='config' label='JSON Config' errortext='Enter a valid JSON'/>
```
or use translate function:

```js
<JsonInput source='config' label={translate('resources.resource_name.fields.config')} errortext={translate('myroot.validate.json')}/>
```
3. Your JSON can be viewed in `show` component using JsonField.
JSON is slightly tweaked to add enough spaces so that it fits the screen.
And hence, it looks pretty now.

```js
<JsonField source='config' label='JSON Config' />
```
You can also set JSON text directly instead of using source prop.

```js
<JsonField json={jsonobj} label='JSON Object' />
```

4. Any TextField with more number of characters can be limited using TrimField.

```js
<TrimField source='field' label='Trimmed Field' />
```
By default, this trims the value to 30 chars and appends ... to the end.
You can customize it.

```js
<TrimField source='field' label='Trimmed Field' limit={40} trimstr='....' />
```
# License

`ra-components` is licensed under [MIT License](./LICENSE.md), sponsored and supported by [BigBasket Tech](https://tech.bigbasket.com).