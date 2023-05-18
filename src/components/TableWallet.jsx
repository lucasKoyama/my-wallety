import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper } from '@mui/material/';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { removeExpense, editExpenseStart } from '../redux/actions';
import './TableWallet.css';

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
    return (
      <TableContainer sx={ { overflowX: 'scroll' } } component={ Paper }>
        <Table sx={ { ...editingBlur, width: '84vw', marginLeft: '300px' } } size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Tag</TableCell>
              <TableCell align="center">Método de pagamento</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Moeda</TableCell>
              <TableCell align="center">Câmbio utilizado</TableCell>
              <TableCell align="center">Valor convertido</TableCell>
              <TableCell align="center">Moeda de conversão</TableCell>
              <TableCell align="center">Editar  Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              expenses.map((expense) => {
                const { description, tag, method, value,
                  currency, exchangeRates, id } = expense;
                const exchange = exchangeRates[currency].ask;
                const conversion = exchange * value;
                return (
                  <TableRow key={ id }>
                    <TableCell align="center">{description}</TableCell>
                    <TableCell align="center">{tag}</TableCell>
                    <TableCell align="center">{method}</TableCell>
                    <TableCell align="center">{Number(value).toFixed(2)}</TableCell>
                    <TableCell align="center">{exchangeRates[currency].name}</TableCell>
                    <TableCell align="center">{Number(exchange).toFixed(2)}</TableCell>
                    <TableCell align="center">{Number(conversion).toFixed(2)}</TableCell>
                    <TableCell align="center">Real</TableCell>
                    <TableCell align="center">
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
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
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
