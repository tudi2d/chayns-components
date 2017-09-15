# AmountControl-Component #

The AmountControl-Component is part of the *tobit-chayns_components*-Package. You can install it with the following command:

    npm install -S tobit-chayns_components@latest


## Usage ##
You have to import the components and styles first:

```jsx
import {AmountControl} from 'tobit-chayns_components';
import 'tobit-chayns_components/react-chayns-amountcontrol/index.css';
```


You can now use the components as followed:
```jsx
<AmountControl
    amount={1}
    onChange={console.log}
    buttonText="Lorem ipsum"
/>
```


### Props ###
You can set the following props on a AmountControl element:

| Property     | Description                                                                             | Type     | Default |
|--------------|-----------------------------------------------------------------------------------------|----------|---------|
| amount       | The current amount (behaves like value, not like defaultValue)                          | number   | 0       |
| onChange     | Function that is called when the user changes the amount                                | function |         |
| onAdd        | Function that is called when the user click on the add button                           | function |         |
| onRemove     | Function that is called when the user click on the remove button                        | function |         |
| equalize     | Equalizes a set of AmountControls (see examples)                                        | string   |         |
| disabled     | Disables all buttons and inputs                                                         | bool     |         |
| disableInput | Disables the input field (forces the user to use the control-buttons)                   | bool     |         |


### Examples ###
#### basic ####
Because the amount-prop works like value and not like defaultValue you have to use a state:
```jsx
export default class Example extends React.Component {
    constructor() {
        super();

        this.state = {
            amount: 0
        };
    }

    onChange = (value) => {
        this.setState({
            amount: value
        });
    };

    render() {
        const {amount} = this.state;

        return(
            <AmountControl
                amount={amount}
                onChange={this.onChange}
                buttonText="0,15"
            />
        );
    }
}
```

#### equalize ####
When you use multiple AmountControls that are near to each other. It maybe looks better, if they have the same size.
The following example exactly does that:
```jsx
<div data-equalize="group-1">
    <AmountControl
        equalize="group-1"
        buttonText="0,15"
    />

    <br />

    <AmountControl
        equalize="group-1"
        buttonText="mtl. 15,95 €"
    />

    <br />

    <AmountControl
        equalize="group-1"
        buttonText="test-article"
    />
</div>
```