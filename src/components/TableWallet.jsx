import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MUIDataTable from 'mui-datatables';
import { removeExpense, editExpenseStart } from '../redux/actions';
import './TableWallet.css';

const columns = [
  {
    name: 'description',
    label: 'Descrição',
    options: { filter: false, sort: true },
  },
  {
    name: 'tag',
    label: 'Tag',
    options: { filter: true, sort: true },
  },
  {
    name: 'method',
    label: 'Método de pagamento',
    options: { filter: true, sort: true },
  },
  {
    name: 'value',
    label: 'Valor',
    options: { filter: false, sort: true },
  },
  {
    name: 'currency',
    label: 'Moeda',
    options: { filter: true, sort: true },
  },
  {
    name: 'exchange',
    label: 'Câmbio utilizado',
    options: { filter: false, sort: true },
  },
  {
    name: 'conversionValue',
    label: 'Valor convertido',
    options: { filter: false, sort: true },
  },
  {
    name: 'conversionCurrency',
    label: 'Moeda de conversão',
    options: { filter: false, sort: true },
  },
  {
    name: 'buttons',
    label: 'Editar  Excluir',
    options: { filter: false, sort: false },
  },
];

const fifty = 50;
const oneHundred = 100;
const options = {
  filterType: 'multiselect',
  print: false,
  responsive: 'stacked',
  rowsPerPage: 50,
  rowsPerPageOptions: [fifty, oneHundred, fifty * 2, oneHundred * 2],
};

class TableWallet extends Component {
  handleClick = (id) => {
    const { expenses, dispatch } = this.props;
    const deleteExpense = expenses.find((expense) => expense.id === id);
    const deleteIndex = expenses.indexOf(deleteExpense);
    expenses.splice(deleteIndex, 1);
    dispatch(removeExpense(expenses));
    this.forceUpdate();
  };

  render() {
    const { expenses, dispatch, editor } = this.props;
    const editingBlur = editor ? { filter: 'blur(2px)' } : {};
    const data = expenses.map((expense) => {
      const { description, tag, method, value,
        currency, exchangeRates, id } = expense;
      const exchange = exchangeRates[currency].ask;
      const conversion = exchange * value;
      return {
        description,
        tag,
        method,
        value: Number(Number(value).toFixed(2)),
        currency: exchangeRates[currency].name,
        exchange: Number(Number(exchange).toFixed(2)),
        conversionValue: Number(Number(conversion).toFixed(2)),
        conversionCurrency: 'Real',
        buttons: (
          <>
            <button
              data-testid="edit-btn"
              onClick={ () => dispatch(editExpenseStart(id)) }
              className="edit-btn"
            >
              <i className="fa-solid fa-pen" />
              <span> Editar </span>
            </button>
            <span>   </span>
            <button
              data-testid="delete-btn"
              onClick={ () => this.handleClick(id) }
              className="delete-btn"
            >
              <i className="fa-solid fa-trash" />
              <span> Excluir</span>
            </button>
          </>
        ),
      };
    });
    return (
      <section className="expenses-table" style={ { ...editingBlur } }>
        <MUIDataTable
          title="Despesas"
          data={ data }
          columns={ columns }
          options={ options }
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

TableWallet.propTypes = ({
  expenses: PropTypes.array,
}).isRequired;

export default connect(mapStateToProps)(TableWallet);
