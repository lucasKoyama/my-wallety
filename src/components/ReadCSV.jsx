import React from 'react';
import PropTypes from 'prop-types';
import './ReadCSV.css';
import { connect } from 'react-redux';
import { addCsvTags, addExpense } from '../redux/actions';

class ReadCSV extends React.Component {
  handleFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      const csvData = this.parseCSVData(contents);
      const headers = csvData[0].map((header) => header.toLowerCase());
      csvData.shift(); // remove primeiro elemento
      csvData.pop(); // remove ultimo elemento
      this.getTags(csvData, headers);
      this.addExpense(csvData, headers);
    };
    reader.readAsText(file);
  };

  getTags = (csvData, headers) => {
    const { addTags } = this.props;
    const csvTagColumn = headers.indexOf('tag');
    const csvTags = [...new Set(csvData.map((line) => line[csvTagColumn]))];
    addTags(csvTags);
  };

  addExpense = (csvData, headers) => {
    const { addCsvExpense } = this.props;
    const csvValueColumn = headers.indexOf('valor');
    const csvDescriptionColumn = headers.indexOf('descricao');
    const csvTagColumn = headers.indexOf('tag');
    csvData.forEach((line) => {
      const value = line[csvValueColumn];
      const tag = line[csvTagColumn];
      const description = line[csvDescriptionColumn];
      const expense = {
        value,
        currency: 'BRL',
        method: 'Dinheiro',
        tag,
        description,
        exchangeRates: { BRL: { ask: 1, name: 'Real Brasileiro' } },
      };
      addCsvExpense(expense);
    });
  };

  parseCSVData = (csvData) => csvData.split('\n').map((line) => line.split(','));

  render() {
    return (
      <div className="upload-csv-btn">
        <label htmlFor="csvFileInput">
          <i className="fa-solid fa-file-arrow-up" />
          Upload CSV
          <input
            type="file"
            id="csvFileInput"
            accept=".csv"
            onChange={ this.handleFile }
            style={ { display: 'none' } }
          />
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTags: (csvTags) => dispatch(addCsvTags(csvTags)),
  addCsvExpense: (expense) => dispatch(addExpense(expense)),
});

ReadCSV.propTypes = ({
  addTags: PropTypes.func,
  addCsvExpense: PropTypes.func,
}).isRequired;

export default connect(null, mapDispatchToProps)(ReadCSV);
