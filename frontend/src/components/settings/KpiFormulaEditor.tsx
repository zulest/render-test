import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { IndicadorResponse } from 'shared/src/types/indicadores.types';
import { IndicadoresList } from '../../features/indicadores/indicadoresList';
import Modal, { ModalHandle } from '../../features/indicadores/formulaView';
import { useRef } from 'react';
import { IndicadorEditor } from '../../features/indicadores/IndicadorEditor';

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
  const [indicadores, setIndicadores] = useState<IndicadorResponse[]>([]);
  const [editIndicador, setEditIndicador] = useState<IndicadorResponse | null>(null);
  const [formulaSelected, setFormulaSelected] = useState<IndicadorResponse | null>(null);
  const modalRef = useRef<ModalHandle>(null);
  useEffect(() => {
    try {
      fetch(`/api/indicadores`).then(response => response.json().then(data => { console.log(data); setIndicadores(data) }))
    } catch (error) {
      console.error("Error al obtener los indicadores", error);
    }
  }, []);

  const showFormula = (indicador: IndicadorResponse) => {
    setFormulaSelected(indicador);
    modalRef.current?.openModal();
  }


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

  const [showEditor, setShowEditor] = useState(false);

  const categories = [
    'Cartera',
    'Captaciones',
    'Socios',
    'Liquidez',
    'Rentabilidad',
    'Eficiencia'
  ];

  const handleDelete = (id: number) => {
    // TODO("Eliminar un indicador");
    //setFormulas(formulas.filter(f => f.id !== id));
  };

  const updateIndicador = (indicador: IndicadorResponse) => {
    setIndicadores(indicadores.map(i => i.id === indicador.id ? indicador : i));
    fetch('/api/indicadores/' + indicador.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(indicador)
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Configuración de KPIs</h2>
          <p className="text-sm text-gray-600">Define y personaliza las fórmulas de cálculo para indicadores</p>
        </div>
        <button
          onClick={() => {
            setEditIndicador(null);
            setShowEditor(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" />
          Nuevo KPI
        </button>
      </div>


      {showEditor && <IndicadorEditor indicador={editIndicador} onSubmit={(indicador: IndicadorResponse) => updateIndicador(indicador)} onCancel={() => setShowEditor(false)} />}
      {indicadores ? <IndicadoresList
        indicadores={indicadores}
        setShowEditor={setShowEditor}
        setEditIndicador={setEditIndicador}
        setFormulaSelected={showFormula}
        handleDelete={handleDelete} /> : <>Error al obtener la lista de indicadores</>}
      <Modal
        ref={modalRef}
        setIndicadores={(indicador: IndicadorResponse) => updateIndicador(indicador)}
        indicador={formulaSelected}
      />
    </div>
  );
};