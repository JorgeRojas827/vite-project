import MyEditor from './MyEditor.tsx';
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
import { IoMdPlay } from 'react-icons/io';

const data = [
  {
    name: 'Page A',
    uv: 4000,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  },
  {
    name: 'Page E',
    uv: 1890,
  },
  {
    name: 'Page F',
    uv: 2390,
  },
  {
    name: 'Page G',
    uv: 3490,
  },
];

function App() {
  const [selectedGraph, setSelectedGraph] = useState('0');

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
      <div className="md:w-1/2 h-full">
        <div className="p-5 flex space-x-3 items-center rounded-lg ">
          <button
            onClick={() => {
              if (selectedGraph !== '0') {
                setSelectedGraph((Number(selectedGraph) - 1).toString());
              }
            }}
            className="bg-indigo-700 mb-10 text-white p-3 rounded-md"
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
          <button className="bg-indigo-700 mb-10 text-white p-3 rounded-md">
            <IoMdPlay />
          </button>
        </div>
        <MyEditor selectedGraph={selectedGraph} />
      </div>
    </main>
  );
}

export default App;
