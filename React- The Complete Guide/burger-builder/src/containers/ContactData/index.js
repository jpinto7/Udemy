import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './styles.module.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import { order as orderActions } from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'cheapest',
              display: 'Cheapest',
            },
            {
              value: 'fastest',
              display: 'Fastest',
            },
          ],
        },
        value: 'fastest',
        valid: true,
        validation: {},
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.purchaseBurger(order, this.props.token);
  };

  handleOnChange = id => event => {
    const updatedFormElement = updateObject(this.state.orderForm[id], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.orderForm[id].validation,
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [id]: updatedFormElement,
    });
    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form>
        {formElementsArray.map(({ id, config }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            touched={config.touched}
            valid={config.valid}
            shouldValidate={config.validation}
            value={config.value}
            onChange={this.handleOnChange(id)}
          />
        ))}
        <Button clicked={this.orderHandler} disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = ({
  burgerBuilder: { ingredients: ings, totalPrice: price },
  order: { loading },
  auth: { token, userId },
}) => ({
  ings,
  price,
  loading,
  token,
  userId,
});

export default connect(
  mapStateToProps,
  orderActions,
)(withErrorHandler(ContactData, axios));
