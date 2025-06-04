import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Pie } from 'react-chartjs-2';

// Đăng ký các thành phần cần thiết của Chart.js
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

class ProductRevenueChart extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      revenueData: [],
      isDarkMode: document.body.getAttribute('data-bs-theme') === 'dark',
    };
  }

  componentDidMount() {
    this.fetchRevenueData();
    window.addEventListener('changeTheme', this.handleThemeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('changeTheme', this.handleThemeChange);
  }

  fetchRevenueData = async () => {
    try {
      const config = { headers: { 'x-access-token': this.context.token } };
      const response = await axios.get('/api/admin/revenue', config);
      this.setState({ revenueData: response.data });
    } catch (error) {
      console.error('Failed to fetch revenue data:', error);
    }
  };

  handleThemeChange = () => {
    this.setState({ isDarkMode: document.body.getAttribute('data-bs-theme') === 'dark' });
  };

  render() {
    const { revenueData, isDarkMode } = this.state;

    const barChartData = {
      labels: revenueData.map(item => item.productName),
      datasets: [
        {
          label: 'Revenue',
          data: revenueData.map(item => item.revenue),
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    const barChartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return '$' + value.toFixed(2);
            },
            font: {
              size: 14, // Kích thước chữ của trục Y
            },
            color: isDarkMode ? 'white' : 'gray', // Màu chữ của trục Y
          },
        },
        x: {
          ticks: {
            font: {
              size: 14, // Kích thước chữ của trục X
            },
            color: isDarkMode ? 'white' : 'gray', // Màu chữ của trục X
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16, // Kích thước chữ của chú thích
            },
            color: isDarkMode ? 'white' : 'gray', // Màu chữ của chú thích
          },
        },
        datalabels: {
          color: 'white',
          font: {
            size: 12,
          },
          formatter: (value, context) => {
            return value;
          }
        }
      },
    };

    const pieChartData = {
      labels: revenueData.map(item => item.productName),
      datasets: [
        {
          label: 'Total Quantity',
          data: revenueData.map(item => item.totalQuantity),
          backgroundColor: revenueData.map(() => `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.6)`),
          borderColor: 'rgba(255,255,255,1)',
          borderWidth: 1,
        },
      ],
    };

    const pieChartOptions = {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16, // Kích thước chữ của chú thích
            },
            color: isDarkMode ? 'white' : 'gray', // Màu chữ của chú thích
          },
        },
        datalabels: {
          color: 'white',
          font: {
            size: 14,
          },
          formatter: (value, context) => {
            return value;
          }
        }
      },
    };

    return (
      <div>
        <div className="container-fluid mb-4">
          <div className="row">
            <div className="card mt-4 flex-column d-flex align-items-center justify-content-center col-lg-12">
              <h2 className='text-center mt-2 mb-3'>Product Revenue Chart</h2>
              {revenueData.length > 0 ? (
                <div className="chart-wrapper">
                  <Bar className='bar_chart' data={barChartData} options={barChartOptions} />
                </div>
              ) : (
                <p>Loading revenue data...</p>
              )}
            </div>
            <div className="card mt-4 flex-column d-flex align-items-center justify-content-center col-lg-12">
              <h2 className='text-center mt-4 mb-4'>Product Quantity Chart</h2>
              {revenueData.length > 0 ? (
                <div className='chart-wrapper'> 
                  <Pie data={pieChartData} className="pie_chart" options={pieChartOptions} /> 
                </div>
              ) : (
                <p>Loading quantity data...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRevenueChart;
