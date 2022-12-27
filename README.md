# About ra-components

_Opensource components for react-admin._

- A tree like menu structure for react-admin, `TreeMenu`
- Validating JSON in a textinput is made easy using `JsonInput`.
- JSON object now looks pretty in `JsonField`.
- Data can be trimmed using `TrimField` while displaying in datagrid etc.
- Validate emails, restrict for a specific set of domains using `EmailInput`.
- Validate URLs, restrict for a specific set of domains using `URLInput`.
- Button to update the values in a record (ex: approve/retry etc) `UpdateButton`.
- Validate phone numbers, restrict for specific countries using `PhoneInput`

**Supported react-admin versions:**

React-Admin 4.x

# Installation

Install using npm: `npm install --save @bb-tech/ra-components`

# Basic Usage

To use `ra-components` in your react-admin application, import the necessary package(s) into your js file.

```js
import {
  TreeMenu,
  JsonInput,
  JsonField,
  TrimField,
} from "@bb-tech/ra-components";
```

2. Now you can use the controls in your code.

```js
<JsonInput source="config" label="JSON Config" />
```

# TreeMenu

To use `ra-treemenu` in your react-admin application:

1. Create a parent resource (non-routing) with the following key in the options prop: `isMenuParent = true`. Remember to pass the mandatory `name` prop in this resource as this will be used to map the child resource to it's specified parent in the tree.

```js
<Resource name="users" options={{ label: "Users", isMenuParent: true }} />
```

2. Now create a child resource under this parent by mapping the `menuParent` option in the `options` props to the `name` of your parent resource.

```js
<Resource name="posts" options={{ label: "Posts", menuParent: "users" }} />
```

This should give you a menu structure like below:

<img src="./assets/tree.png" alt="Tree Image">

Here's a simple example of organising the menu into a tree-like structure:

```js
// In App.js
import * as React from "react";
import { Admin, Resource, Layout } from "react-admin";
/* Import TreeMenu from the package */
import TreeMenu from "@bb-tech/ra-components";

const App = () => (
  <Admin layout={(props) => <Layout {...props} menu={TreeMenu} />}>
    {/* Dummy parent resource with isMenuParent options as true */}
    <Resource name="users" options={{ label: "Users", isMenuParent: true }} />
    {/* Children menu items under parent */}
    <Resource name="posts" options={{ label: "Posts", menuParent: "users" }} />
    <Resource
      name="comments"
      options={{ label: "Comments", menuParent: "users" }}
    />
    {/* Dummy parent resource with isMenuParent options as true */}
    <Resource name="groups" options={{ label: "Groups", isMenuParent: true }} />
    {/* Children menu items under parent */}
    <Resource
      name="members"
      options={{ label: "Members", menuParent: "groups" }}
    />
  </Admin>
);

export default App;
```

By default, `TreeMenu` uses primary and secondary colors of the current theme for menu title. It can be switched off by marking `setMenuColors` prop as false. Also, Dashboard menu title is "Dashboard". It can be configured using `dashboardlabel` prop.

```js
TreeMenu.defaultProps.dashboardlabel = translate("resources.dashboard.name");
TreeMenu.defaultProps.setMenuColors = false;
<Layout {...props} menu={TreeMenu} />;
```

# JsonInput

`JsonInput` validates if the entered value is JSON or not.
If entered value is not a invalid JSON, `JsonInput` will throw an error.  
Default error message is: `Invalid JSON` and can be overridden using `errortext` prop.

```js
<JsonInput source="config" label="JSON Config" errortext="Enter a valid JSON" />
```

or use translate function:

```js
<JsonInput
  source="config"
  label={translate("resources.resource_name.fields.config")}
  errortext={translate("myroot.validate.json")}
/>
```

By default, `JsonInput` parses and returns the entered string as object. Instead, to send string directly, please pass `parse` prop as `false`

```js
<JsonInput source="config" label="JSON Config" parse={false} />
```

# JsonField

Your JSON can be viewed in a tree structure using `JsonField` .

```js
<JsonField source="config" label="JSON Config" />
```

You can send multiple sources as comma seperated string.
If you send source as `ALL`, JSON tree will be created from all the values of record.

```js
<JsonField source="config1,config2" label="JSON Config" />
```

You can also set JSON text directly instead of using source prop.

```js
<JsonField json={jsonobj} label="JSON Object" />
```

If `treeview` is `false`, JSON is viewed as text, i.e., tweaked to add enough spaces so that it fits the screen.

```js
<JsonField json={jsonobj} label="JSON Object" treeview={false} />
```

Also, if `togglelabel` is set, a button is shown additionally to toggle between `tree` and `text`.

```js
<JsonField json={jsonobj} label="JSON Object" togglelabel="Toggle-View" />
```

If `expandlabel` and `collapselabel` are set, a button is shown additionally to toggle between `expand` and `collapse`.

```js
<JsonField
  json={jsonobj}
  label="JSON Object"
  expandlabel="Expand"
  collapselabel="Collapse"
/>
```

# TrimField

Any `TextField` with more number of characters can be limited using `TrimField`.

```js
<TrimField source="field" label="Trimmed Field" />
```

By default, this trims the value to 30 chars and appends ... to the end.

You can customize it.

```js
<TrimField source="field" label="Trimmed Field" limit={40} trimstr="...." />
```

# EmailInput

`EmailInput` is used to validate if the entered value is an email or not.

```js
<EmailInput source="email" label="Email Address" />
```

You can restrict the email to a specific domain.

```js
<EmailInput source="email" domains={["yourdomain.com"]} />
```

MULTIPLE allows it to take comma separated email addresses. Or you can specify a separator.

```js
<EmailInput
  source="email"
  domains={["yourdomain.com"]}
  type={EmailTypes.MULTIPLE}
  splitchar=";"
/>
```

In case of an invalid email address, you can customize the error message using `errortext` prop.

**Notes for `EmailTypes.ARRAY`**

- If you want to get array of email addresses, please pass type as `EmailTypes.ARRAY`.
- By default each of `EmailInput` component is wrapped on the screen.
- You can pass `wrap={false}` to get each `EmailInput` one below the other.
- 'Emails' is the default label given to the array. Use `grouplabel` prop to override.

# URLInput

`URLInput` is used to validate if the entered value is a valid URL or not.

```js
<URLInput source="url" label="URL" />
```

You can restrict the URL to a specific domain.

```js
<URLInput source="url" domains={["yourdomain.com"]} />
```

By default, URLInput allows only `https`. You can extend it for `http` or `ftp`.

```js
<URLInput
  source="url"
  domains={["yourdomain.com"]}
  httpAllowed={true}
  ftpAllowed={true}
/>
```

If you want an API endpoint to be captured without http and domain, you can use `APIEndPoint`.
APIEndPoint allows any string starting with `/`.

```js
<URLInput source="url" APIEndPoint={true} />
```

MULTIPLE allows it to take comma separated urls. Or you can specify a separator.

```js
<URLInput
  source="url"
  domains={["yourdomain.com"]}
  type={URLTypes.MULTIPLE}
  splitchar=";"
/>
```

In case of an invalid URL, you can customize the error message using `errortext` prop.

# PhoneInput

`PhoneInput` is used to validate if the entered value is a valid phone number or not.

```js
<PhoneInput source="phone" label="Phone Number" />
```

You can restrict to phone numbers of specific country by using the `country` prop. Two letter ISO code should be used here.

```js
<PhoneInput source="phone" label="Phone Number" country="IN" />
```

MULTIPLE allows it to take comma separated phone numbers. Or you can specify a separator.

```js
<PhoneInput
  source="phone"
  label="Phone Number"
  type={PhoneTypes.MULTIPLE}
  splitchar=";"
/>
```

In case of an invalid phone number, you can customize the error message using `errortext` prop.

**Notes for `PhoneTypes.ARRAY`**

- If you want to get array of phone numbers, please pass type as `PhoneTypes.ARRAY`.
- By default each of `PhoneInput` component is wrapped on the screen.
- You can pass `wrap` as `false` to get each `PhoneInput` one below the other.
- `Phone Numbers` is the default label given to the array. Use `grouplabel` prop to override.

# UpdateButton

You may want to add a button to update specific column of a record.
Example: You can add a button to Approve a post.

```js
<UpdateButton resource="posts" label="Approve" source="is_approved" />
```

In the above example, `is_approved` column of the curret record within `posts`, will be updated to `true`.

You can pass value prop to update the source to a specific value, instead of `true`.

```js
<UpdateButton
  resource="posts"
  label="Approve"
  source="post_status"
  value="APPROVED"
/>
```

You can also update two or more columns by passing json in data.
Ex: Approve the post and also update the status as APPROVED

```js
const data = { is_approved: true, post_status: "APPROVED" };
<UpdateButton resource="posts" label="Approve" data={data} />;
```

Note: You can send either source or data. if source is there, data is ignored.

By default, `UpdateButton` merges the un-updated data and updated data and sends the whole object. If your API expects only updated data, you can turn this off using merge prop.

```js
const data = { is_approved: true, post_status: "APPROVED" };
<UpdateButton resource="posts" label="Approve" data={data} merge={false} />;
```

# License

`ra-components` is licensed under [MIT License](./LICENSE.md), sponsored and supported by [BigBasket Tech](https://tech.bigbasket.com).
