import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'; // ou Pie?
import { connect } from 'react-redux';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

class PizzaChart extends React.Component {
  render() {
    // Get data from expenses
    const { expenses } = this.props;
    const info = expenses.reduce((obj, expense) => {
      const { tag, value, currency, exchangeRates } = expense;
      const actualValue = exchangeRates[currency].ask * value;
      const prevValue = obj[tag] === undefined ? 0 : Number(obj[tag]);
      return { ...obj, [tag]: Number((prevValue + actualValue).toFixed(2)) };
    }, {});
    const tags = Object.keys(info);
    const values = Object.values(info);
    const totalValue = values.reduce((acc, cur) => acc + cur, 0);
    const tagPorcentage = tags.map(
      (tag, index) => `${tag} (${((values[index] / totalValue) * 100).toFixed(2)}%)`,
    );

    const generateBluePalette = (colorsQtd) => {
      const colors = [];
      const increment = 1 / (colorsQtd - 1);
      const red = 173;
      const green = 216;
      const blue = 230;
      const blueVariation = 128;
      for (let i = 0; i < colorsQtd; i += 1) {
        const ratio = i * increment;
        const r = Math.round((1 - ratio) * red + ratio * 0);
        const g = Math.round((1 - ratio) * green + ratio * 0);
        const b = Math.round((1 - ratio) * blue + ratio * blueVariation);

        const color = `rgba(${r}, ${g}, ${b}, 0.95)`;
        colors.push(color);
      }
      return colors;
    };

    const blueColors = generateBluePalette(tags.length);

    // Fill data
    const data = {
      labels: tagPorcentage,
      datasets: [{
        label: 'Gasto',
        data: values,
        backgroundColor: blueColors.length <= 1 ? ['#B1DAE7'] : blueColors,
        borderColor: blueColors.length <= 1 ? ['#B1DAE7'] : blueColors,
      }],
    };

    return (
      <div>
        <div style={ { margin: '20px auto 50px' } }>
          <Doughnut data={ data } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

PizzaChart.propTypes = ({
  expenses: PropTypes.array,
}).isRequired;

export default connect(mapStateToProps)(PizzaChart);
