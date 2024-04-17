import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export const FinancialChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Crea el gráfico una vez que el componente se monta
    chartInstance.current = createChart(chartContainerRef.current, {
      width: 800,
      height: 400,
      localization: {
        locale: 'es-ES', // Configura el idioma del gráfico si es necesario
      },
    });

    // Agrega una serie de líneas al gráfico
    const lineSeries = chartInstance.current.addLineSeries();

    // Establece los datos para la serie de líneas
    lineSeries.setData(data);

    // Limpia el gráfico cuando el componente se desmonta
    return () => {
      chartInstance.current.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
}
