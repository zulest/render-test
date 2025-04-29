import React, { useState } from 'react';
import { Save, Plus, Trash2, Calculator, Info } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

interface Formula {
  id: string;
  name: string;
  description: string;
  formula: string;
  variables: string[];
  category: string;
  threshold: {
    warning: number;
    critical: number;
    unit: string;
  };
}

export const KpiFormulaEditor: React.FC = () => {
  const [formulas, setFormulas] = useState<Formula[]>([
    {
      id: '1',
      name: 'Índice de Morosidad',
      description: 'Porcentaje de cartera vencida sobre cartera total',
      formula: '(cartera_vencida / cartera_total) * 100',
      variables: ['cartera_vencida', 'cartera_total'],
      category: 'Cartera',
      threshold: {
        warning: 3,
        critical: 5,
        unit: '%'
      }
    },
    {
      id: '2',
      name: 'Crecimiento Mensual',
      description: 'Variación porcentual del saldo respecto al mes anterior',
      formula: '((saldo_actual - saldo_anterior) / saldo_anterior) * 100',
      variables: ['saldo_actual', 'saldo_anterior'],
      category: 'Captaciones',
      threshold: {
        warning: 1,
        critical: 0,
        unit: '%'
      }
    }
  ]);

  const [editingFormula, setEditingFormula] = useState<Formula | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const categories = [
    'Cartera',
    'Captaciones',
    'Socios',
    'Liquidez',
    'Rentabilidad',
    'Eficiencia'
  ];

  const handleSave = (formula: Formula) => {
    if (editingFormula) {
      setFormulas(formulas.map(f => f.id === formula.id ? formula : f));
    } else {
      setFormulas([...formulas, { ...formula, id: Date.now().toString() }]);
    }
    setShowEditor(false);
    setEditingFormula(null);
  };

  const handleDelete = (id: string) => {
    setFormulas(formulas.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Configuración de KPIs</h2>
          <p className="text-sm text-gray-600">Define y personaliza las fórmulas de cálculo para indicadores</p>
        </div>
        <button
          onClick={() => {
            setEditingFormula(null);
            setShowEditor(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" />
          Nuevo KPI
        </button>
      </div>

      {showEditor && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            {editingFormula ? 'Editar KPI' : 'Nuevo KPI'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del KPI
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editingFormula?.name || ''}
                onChange={(e) => setEditingFormula(prev => ({ ...prev!, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                value={editingFormula?.description || ''}
                onChange={(e) => setEditingFormula(prev => ({ ...prev!, description: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editingFormula?.category || categories[0]}
                onChange={(e) => setEditingFormula(prev => ({ ...prev!, category: e.target.value }))}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fórmula
                <Tooltip content="Usa operadores matemáticos básicos (+, -, *, /) y variables en minúsculas separadas por guion bajo">
                  <Info size={16} className="inline ml-1 text-gray-400" />
                </Tooltip>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editingFormula?.formula || ''}
                onChange={(e) => setEditingFormula(prev => ({ ...prev!, formula: e.target.value }))}
                placeholder="Ejemplo: (valor1 + valor2) / total * 100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Variables
                <Tooltip content="Lista de variables utilizadas en la fórmula, separadas por coma">
                  <Info size={16} className="inline ml-1 text-gray-400" />
                </Tooltip>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editingFormula?.variables.join(', ') || ''}
                onChange={(e) => setEditingFormula(prev => ({ ...prev!, variables: e.target.value.split(',').map(v => v.trim()) }))}
                placeholder="variable1, variable2, total"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Umbral de Advertencia
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingFormula?.threshold.warning || ''}
                  onChange={(e) => setEditingFormula(prev => ({
                    ...prev!,
                    threshold: { ...prev!.threshold, warning: parseFloat(e.target.value) }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Umbral Crítico
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingFormula?.threshold.critical || ''}
                  onChange={(e) => setEditingFormula(prev => ({
                    ...prev!,
                    threshold: { ...prev!.threshold, critical: parseFloat(e.target.value) }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unidad
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingFormula?.threshold.unit || ''}
                  onChange={(e) => setEditingFormula(prev => ({
                    ...prev!,
                    threshold: { ...prev!.threshold, unit: e.target.value }
                  }))}
                  placeholder="%"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => {
                  setShowEditor(false);
                  setEditingFormula(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSave(editingFormula!)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Save size={18} className="mr-2" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KPI
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fórmula
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Umbrales
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formulas.map((formula) => (
                <tr key={formula.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formula.name}</div>
                    <div className="text-sm text-gray-500">{formula.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {formula.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-mono">{formula.formula}</div>
                    <div className="text-xs text-gray-500">
                      Variables: {formula.variables.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                        <span>{formula.threshold.warning}{formula.threshold.unit}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-red-400"></span>
                        <span>{formula.threshold.critical}{formula.threshold.unit}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingFormula(formula);
                        setShowEditor(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded-md"
                    >
                      <Calculator size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(formula.id)}
                      className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded-md ml-2"
                    >
                      <Trash2 size={18} />
                    </button>
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