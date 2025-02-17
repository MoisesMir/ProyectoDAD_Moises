import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Papa from 'papaparse';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export function Graficos() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse('/200125_LoL_champion_data.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          setError('Error al cargar el archivo CSV.');
        } else {
          setChampions(result.data);
        }
        setLoading(false);
      },
      error: () => {
        setError('Hubo un problema al cargar el archivo CSV.');
        setLoading(false);
      },
    });
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const rolesData = champions.reduce((acc, champion) => {
    const role = champion.role || 'Desconocido';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(rolesData),
    datasets: [
      {
        label: 'Cantidad de campeones por rol',
        data: Object.values(rolesData),
        backgroundColor: 'rgba(255, 99, 132, 0.8)', // Color rojo
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const positionData = champions.reduce((acc, champion) => {
    const positions = (champion.client_positions || '')
      .split(',')
      .map((pos) => pos.trim().split(' ')[0])
      .filter((pos, index, self) => self.indexOf(pos) === index);

    positions.forEach((position) => {
      acc[position] = (acc[position] || 0) + 1;
    });

    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(positionData),
    datasets: [
      {
        data: Object.values(positionData),
        backgroundColor: ['#FF6347', '#FFD700', '#32CD32', '#1E90FF', '#FF8C00'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          max: 20,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label || ''}: ${tooltipItem.raw || 0}`,
        },
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '70px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px',color :'black' }}>Gráficos de Campeones</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',color :'black' }}>
        <div style={{ width: '45%', height: '400px', marginBottom: '20px' }}>
          <h3 style={{ marginTop: '0' }}>Gráfico de barras: Cantidad de campeones por rol</h3>
          <Bar data={barData} options={barOptions} />
        </div>
        <div style={{ width: '45%', height: '400px', marginBottom: '20px' }}>
          <h3 style={{ marginTop: '0' }}>Gráfico circular: Cantidad de campeones por posición</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}
