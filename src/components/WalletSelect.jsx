import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material/';
import { connect } from 'react-redux';

class WalletSelect extends React.Component {
  render() {
    const { label, dataTestId, value, handleChange, options } = this.props;
    const name = dataTestId.split('-input');
    return (
      <FormControl sx={ { width: '100%', marginBottom: '12px' } }>
        <InputLabel id={ name[0] }>{`${label}`}</InputLabel>
        <Select
          sx={ { height: 50 } }
          inputProps={ { 'data-testid': dataTestId } }
          labelId={ name[0] }
          label={ label }
          name={ name[0] }
          value={ value }
          onChange={ handleChange }
        >
          {options.map((opt, i) => <MenuItem value={ opt } key={ i }>{opt}</MenuItem>)}
        </Select>
      </FormControl>
    );
  }
}

WalletSelect.propTypes = {
  label: PropTypes.string,
  dataTestId: PropTypes.string,
  handleChange: PropTypes.func,
  width: PropTypes.number,
  options: PropTypes.array,
}.isRequired;

export default connect()(WalletSelect);
