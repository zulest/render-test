import React, { useState } from 'react';
import { File as FilePdf, FileText, Download, Eye, Filter, Calendar } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  size: string;
  status: 'generated' | 'pending' | 'failed';
}

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Informe Financiero Mensual',
      type: 'Contabilidad',
      createdAt: '15/06/2025',
      size: '2.4 MB',
      status: 'generated',
    },
    {
      id: '2',
      name: 'Análisis de Cartera Vencida',
      type: 'Cartera',
      createdAt: '10/06/2025',
      size: '1.8 MB',
      status: 'generated',
    },
    {
      id: '3',
      name: 'Reporte de Captaciones',
      type: 'Captaciones',
      createdAt: '05/06/2025',
      size: '3.2 MB',
      status: 'generated',
    },
    {
      id: '4',
      name: 'Indicadores para SEPS',
      type: 'Regulatorio',
      createdAt: '01/06/2025',
      size: '4.5 MB',
      status: 'generated',
    },
    {
      id: '5',
      name: 'Pronóstico Financiero Q3',
      type: 'Planificación',
      createdAt: 'En proceso',
      size: 'Pendiente',
      status: 'pending',
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');
  
  const reportTypes = ['Todos', 'Contabilidad', 'Cartera', 'Captaciones', 'Regulatorio', 'Planificación'];
  
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'Todos' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });
  
  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'generated':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Generado</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En proceso</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Error</span>;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Informes y Reportes</h1>
          <p className="text-gray-600">Gestiona y descarga los informes generados por el sistema</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition">
            <FileText className="mr-2" size={18} />
            <span>Generar nuevo informe</span>
          </button>
          
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50 transition">
            <Calendar className="mr-2" size={18} />
            <span>Programar informe</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar informes..."
              className="pl-9 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="bg-white border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {reportTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamaño
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-blue-50 text-blue-600">
                        {report.type === 'Contabilidad' || report.type === 'Regulatorio' ? (
                          <FilePdf size={20} />
                        ) : (
                          <FileText size={20} />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{report.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{report.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{report.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(report.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {report.status === 'generated' ? (
                      <>
                        <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded-md">
                          <Eye size={18} />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded-md">
                          <Download size={18} />
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 cursor-not-allowed">En proceso...</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};