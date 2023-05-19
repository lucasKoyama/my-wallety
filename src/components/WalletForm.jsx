import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button } from '@mui/material/';
import WalletSelect from './WalletSelect';
import { fetchQuotation, editExpenseDone } from '../redux/actions';
import './WalletForm.css';
import PizzaChart from './PizzaChart';
import ReadCSV from './ReadCSV';

const defaultState = {
  value: '',
  currency: 'BRL',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  firstRunEditing: true,
};

class WalletForm extends React.Component {
  state = defaultState;

  componentDidUpdate() {
    const { firstRunEditing } = this.state;
    const { editor } = this.props;
    if (editor && firstRunEditing) { this.editExpenseData(); }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  pushExpense = () => {
    const { dispatch } = this.props;
    const formData = { ...this.state };
    delete formData.firstRunEditing;
    dispatch(fetchQuotation(formData));
    this.setState({ value: '', description: '' });
  };

  editExpenseData = () => {
    const { expenses, idToEdit } = this.props;
    const idIndex = expenses.indexOf(expenses.find((expense) => expense.id === idToEdit));
    Object.keys(this.state)
      .forEach((key) => this.setState({ [key]: expenses[idIndex][key] }));
    this.setState({ firstRunEditing: false });
  };

  editExpenseSubmit = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const editExpense = expenses.find((expense) => expense.id === idToEdit);
    editExpense.value = value;
    editExpense.currency = currency;
    editExpense.method = method;
    editExpense.tag = tag;
    editExpense.description = description;
    dispatch(editExpenseDone(expenses));
    this.setState(defaultState);
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies, tags, editor } = this.props;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const editingFocus = editor ? { border: '2px solid black' } : {};
    return (
      <aside>
        <form
          className={ `expense-form ${editor ? 'show-form' : ''}` }
          style={ { ...editingFocus } }
        >
          <TextField
            label="Valor"
            inputProps={ { 'data-testid': 'value-input', min: 0, style: { height: 17 } } }
            type="number"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChange }
            style={ { marginBottom: 12 } }
          />
          <WalletSelect
            label="Moeda"
            dataTestId="currency-input"
            value={ currency }
            handleChange={ this.handleChange }
            options={ currencies.length > 0 ? currencies : ['BRL'] }
          />
          <WalletSelect
            label="Método de pagamento"
            dataTestId="method-input"
            value={ method }
            handleChange={ this.handleChange }
            options={ paymentMethods }
          />
          <WalletSelect
            label="Tag"
            dataTestId="tag-input"
            value={ tag }
            handleChange={ this.handleChange }
            options={ tags.length > 0 ? tags : ['Alimentação'] }
          />
          <TextField
            label="Descrição"
            inputProps={ { 'data-testid': 'description-input', style: { height: 17 } } }
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
            style={ { marginBottom: 12 } }
          />
          {
            editor
              ? (
                <Button
                  type="button"
                  onClick={ () => this.editExpenseSubmit() }
                  className="walletForm-btn"
                >
                  <i className="fa-solid fa-pen-to-square" />
                  <span>Editar despesa</span>
                </Button>
              )
              : (
                <Button
                  type="button"
                  onClick={ () => this.pushExpense() }
                  className="walletForm-btn"
                >
                  <i className="fa-solid fa-circle-dollar-to-slot" />
                  <span>Adicionar despesa</span>
                </Button>
              )
          }
          <ReadCSV />
          <div className="made-by">
            <h5>© Developed by: Lucas Koyama</h5>
            <a href="https://www.linkedin.com/in/lucas-koyama/">
              <i className="fa-brands fa-linkedin" />
            </a>
          </div>
          <div className="pizza-chart">
            <PizzaChart />
          </div>
        </form>
      </aside>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  tags: state.wallet.tags,
});

WalletForm.propTypes = ({
  currencies: PropTypes.array,
}).isRequired;

export default connect(mapStateToProps)(WalletForm);
