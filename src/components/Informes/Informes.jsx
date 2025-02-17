import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';

export function Informes() {
  const [difficulty, setDifficulty] = useState('');
  const [heroType, setHeroType] = useState('');
  const [champions, setChampions] = useState([]);

  // Cargar el archivo CSV desde la carpeta public
  useEffect(() => {
    Papa.parse('/200125_LoL_champion_data.csv', {
      download: true,
      header: true, // El archivo CSV tiene cabeceras
      complete: (result) => {
        console.log(result.data); // Para depurar los datos cargados
        setChampions(result.data); // Guardar los datos parseados
      },
    });
  }, []);

  const handleGeneratePDF = () => {
    const filteredChampions = champions.filter((champion) => {
      return (
        (difficulty ? champion.difficulty === difficulty : true) &&
        (heroType ? champion.herotype === heroType : true)
      );
    });

    if (filteredChampions.length === 0) {
      alert('No hay campeones que coincidan con los filtros seleccionados.');
      return;
    }

    const doc = new jsPDF();

    // Título del informe
    doc.setFontSize(18);
    doc.text('Informe de Campeones', 105, 20, { align: 'center' });

    // Encabezado
    doc.setFontSize(12);
    doc.text(
      'Este informe muestra información detallada sobre los campeones filtrados por dificultad y tipo de héroe.',
      10,
      30
    );

    // Cabecera de columna
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 255); // Color azul
    doc.text('Nombre', 10, 40);
    doc.text('Dificultad', 70, 40);
    doc.text('Tipo de Héroe', 110, 40);
    doc.text('Estadísticas', 150, 40);

    // Detalles de los campeones
    doc.setTextColor(0, 0, 0); // Color negro para el contenido
    filteredChampions.forEach((champion, index) => {
      const y = 50 + index * 10;

      // Ajusta las propiedades según los nombres reales de las columnas
      doc.text(champion.apiname || 'Desconocido', 10, y);
      doc.text(champion.difficulty || 'N/A', 70, y);
      doc.text(champion.herotype || 'N/A', 110, y);
      doc.text(champion.stats || 'N/A', 150, y);
    });

    // Pie de columnas
    doc.setTextColor(0, 0, 255);
    doc.text('Fin de la página', 10, 280);

    // Resumen al final
    const totalChampions = filteredChampions.length;
    doc.setTextColor(128, 0, 128); // Color morado para el resumen
    doc.text(
      `Resumen: Total de campeones filtrados: ${totalChampions} con la dificultad: ${difficulty} y el tipo de heroe: ${heroType}` ,
      10,
      290
    );


    // Guardar el PDF
    doc.save('informe_campeones.pdf');
  };

  return (
    <div>
      <h2>Generar Informe de Campeones</h2>
      <form>
        <label>
          Dificultad:
          <select
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <option value="">Seleccione Dificultad</option>
            <option value="1">Fácil</option>
            <option value="2">Moderado</option>
            <option value="3">Difícil</option>
          </select>
        </label>
        <label>
          Tipo de Héroe:
          <select
            onChange={(e) => setHeroType(e.target.value)}
            value={heroType}
          >
            <option value="">Seleccione Tipo de Héroe</option>
            <option value="Assassin">Asesino</option>
            <option value="Mage">Mago</option>
            <option value="Tank">Tanque</option>
            <option value="Support">Soporte</option>
            <option value="Marksman">Arquero</option>
            <option value="Fighther">Luchador</option>


          </select>
        </label>
        <button type="button" onClick={handleGeneratePDF}>
          Imprimir
        </button>
      </form>
    </div>
  );
}
