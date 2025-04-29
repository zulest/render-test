import React, { useState } from 'react';
import { ChartCard } from '../components/dashboard/ChartCard';
import { KpiCard } from '../components/dashboard/KpiCard';
import { TrendingUp, Users, Building2, CreditCard, Wallet, PiggyBank } from 'lucide-react';

export const Analysis: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [timeRange, setTimeRange] = useState('6m');

  // Datos de ejemplo para las gráficas
  const officeGrowthData = [
    { month: 'Ene', matriz: 2500000, norte: 1800000, sur: 1500000, valle: 1200000 },
    { month: 'Feb', matriz: 2600000, norte: 1850000, sur: 1600000, valle: 1250000 },
    { month: 'Mar', matriz: 2750000, norte: 1900000, sur: 1650000, valle: 1300000 },
    { month: 'Abr', matriz: 2800000, norte: 1950000, sur: 1700000, valle: 1350000 },
    { month: 'May', matriz: 2900000, norte: 2000000, sur: 1750000, valle: 1400000 },
    { month: 'Jun', matriz: 3000000, norte: 2100000, sur: 1800000, valle: 1450000 },
  ];

  const productGrowthData = [
    { month: 'Ene', consumo: 1200000, microempresa: 800000, vivienda: 500000, comercial: 300000 },
    { month: 'Feb', consumo: 1250000, microempresa: 850000, vivienda: 520000, comercial: 320000 },
    { month: 'Mar', consumo: 1300000, microempresa: 900000, vivienda: 540000, comercial: 340000 },
    { month: 'Abr', consumo: 1350000, microempresa: 950000, vivienda: 560000, comercial: 360000 },
    { month: 'May', consumo: 1400000, microempresa: 1000000, vivienda: 580000, comercial: 380000 },
    { month: 'Jun', consumo: 1450000, microempresa: 1050000, vivienda: 600000, comercial: 400000 },
  ];

  const membershipData = [
    { month: 'Ene', activos: 8000, nuevos: 200, inactivos: 150 },
    { month: 'Feb', activos: 8050, nuevos: 180, inactivos: 130 },
    { month: 'Mar', activos: 8100, nuevos: 190, inactivos: 140 },
    { month: 'Abr', activos: 8150, nuevos: 210, inactivos: 160 },
    { month: 'May', activos: 8200, nuevos: 220, inactivos: 170 },
    { month: 'Jun', activos: 8250, nuevos: 230, inactivos: 180 },
  ];

  const savingsData = [
    { month: 'Ene', vista: 1500000, plazo: 2500000 },
    { month: 'Feb', vista: 1550000, plazo: 2600000 },
    { month: 'Mar', vista: 1600000, plazo: 2700000 },
    { month: 'Abr', vista: 1650000, plazo: 2800000 },
    { month: 'May', vista: 1700000, plazo: 2900000 },
    { month: 'Jun', vista: 1750000, plazo: 3000000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Análisis Detallado</h1>
          <p className="text-gray-600">Evolución y tendencias por oficinas y productos</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas las oficinas</option>
            <option value="matriz">Matriz</option>
            <option value="norte">Agencia Norte</option>
            <option value="sur">Agencia Sur</option>
            <option value="valle">Agencia Valle</option>
          </select>

          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los productos</option>
            <option value="consumo">Crédito Consumo</option>
            <option value="microempresa">Microcrédito</option>
            <option value="vivienda">Crédito Vivienda</option>
            <option value="comercial">Crédito Comercial</option>
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1m">Último mes</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último año</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Crecimiento Total"
          value="15.8%"
          change={2.3}
          icon={<TrendingUp size={20} />}
          color="blue"
          description="Crecimiento anual consolidado"
        />
        
        <KpiCard
          title="Nuevos Socios"
          value="230"
          change={4.5}
          icon={<Users size={20} />}
          color="green"
          description="Socios nuevos en el último mes"
        />
        
        <KpiCard
          title="Oficina más Activa"
          value="Matriz"
          change={8.2}
          icon={<Building2 size={20} />}
          color="purple"
          description="Por volumen de operaciones"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Crecimiento por Oficinas"
          subTitle="Evolución de cartera por oficina"
          type="line"
          data={officeGrowthData}
          xDataKey="month"
          series={[
            { dataKey: 'matriz', color: '#2563EB', name: 'Matriz' },
            { dataKey: 'norte', color: '#10B981', name: 'Norte' },
            { dataKey: 'sur', color: '#F59E0B', name: 'Sur' },
            { dataKey: 'valle', color: '#7C3AED', name: 'Valle' },
          ]}
        />

        <ChartCard
          title="Crecimiento por Producto"
          subTitle="Evolución por tipo de crédito"
          type="area"
          data={productGrowthData}
          xDataKey="month"
          series={[
            { dataKey: 'consumo', color: '#3B82F6', name: 'Consumo' },
            { dataKey: 'microempresa', color: '#10B981', name: 'Microempresa' },
            { dataKey: 'vivienda', color: '#F59E0B', name: 'Vivienda' },
            { dataKey: 'comercial', color: '#EF4444', name: 'Comercial' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Evolución de Socios"
          subTitle="Movimiento mensual de socios"
          type="bar"
          data={membershipData}
          xDataKey="month"
          series={[
            { dataKey: 'activos', color: '#10B981', name: 'Activos' },
            { dataKey: 'nuevos', color: '#3B82F6', name: 'Nuevos' },
            { dataKey: 'inactivos', color: '#EF4444', name: 'Inactivos' },
          ]}
        />

        <ChartCard
          title="Captaciones por Tipo"
          subTitle="Ahorros vista vs. plazo fijo"
          type="area"
          data={savingsData}
          xDataKey="month"
          series={[
            { dataKey: 'vista', color: '#7C3AED', name: 'Ahorros Vista' },
            { dataKey: 'plazo', color: '#F59E0B', name: 'Plazo Fijo' },
          ]}
        />
      </div>
    </div>
  );
};