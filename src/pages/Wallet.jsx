import React from 'react';
import './Wallet.css';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import TableWallet from '../components/TableWallet';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main className="expense-section">
          <WalletForm />
          <TableWallet />
        </main>
      </>
    );
  }
}

export default Wallet;
