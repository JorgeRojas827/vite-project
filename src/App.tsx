import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
} from 'recharts';
import { useEffect, useRef, useState } from 'react';
import { useStateCallback } from './hooks/useStateCallback';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    amt: 2100,
  },
];

function App() {
  const [selectedGraph, setSelectedGraph] = useState('0');
  const counter = useRef(0);
  const demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';
  const onChange = (newValue: any) => {
    console.log('change', newValue);
  };

  useEffect(() => {
    setSelectedGraph((prevState) => (Number(prevState) + 1).toString());
  }, []);

  return (
    <main className="bg-gray-800 flex p-20 space-x-5 flex-col md:flex-row justify-between w-screen h-screen text-white">
      <div className=" md:w-1/2 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#82ca9d">
              {data.map((e, index) => {
                return (
                  <Cell
                    fill={index.toString() === selectedGraph ? 'red' : 'black'}
                    id={index.toString()}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="md:w-1/2 p-5 bg-slate-700 rounded-lg h-full">
        <button
          onClick={() => {
            if (selectedGraph !== '0') {
              setSelectedGraph((Number(selectedGraph) - 1).toString());
            }
          }}
          className="bg-indigo-700 mb-10 mr-5 text-white p-3 rounded-md"
        >
          Anterior
        </button>
        <button
          onClick={() => {
            if (selectedGraph !== (data.length - 1).toString()) {
              setSelectedGraph((Number(selectedGraph) + 1).toString());
            }
          }}
          className="bg-indigo-700 mb-10 text-white p-3 rounded-md"
        >
          Siguiente
        </button>
        <AceEditor
          theme="dracula"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </main>
  );
}

export default App;
