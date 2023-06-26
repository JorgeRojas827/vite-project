import MyEditor from './MyEditor.tsx';
import {ResponsiveContainer, BarChart, CartesianGrid,
  XAxis, YAxis, Tooltip, Bar, Cell,
} from 'recharts';
import { useState } from 'react';
import { IoMdPlay } from 'react-icons/io';
import bubbleSortAlgo from './hooks/sortingBubble.tsx';


function App() {

  const [selectedLine, setSelectedLine] = useState(1);
  const [selectIndex, setSelectedIndex] = useState('0');
  
  const [selectedGraph, setSelectedGraph] = useState(['0', '1']);

  const [data, setData] = useState([
    {name: '3500', uv: 3500,},
    {name: '3000', uv: 3000,},
    {name: '2780', uv: 2780,},
    {name: '2000', uv: 2000,},
    {name: '2390', uv: 2390,},
    {name: '1890', uv: 1890,},
    {name: '3490', uv: 3490,},
  ]);
  
  
  const bubbleSortHandler = () => {
    bubbleSortAlgo(data, setData, setSelectedGraph, setSelectedLine);
    console.log('App', selectedLine)
  };
    


  return (
    <main className="bg-gray-800 flex p-20 space-x-5 flex-col md:flex-row justify-between w-screen h-screen text-white">
      
      <div className=" md:w-1/2 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uv" fill="#82ca9d">
              {/*<LabelList dataKey='name' position="middle" dy={-10} fill="white" fontSize={12} fontWeight="bold"/>*/}

              {data.map((e, index) => {
                return (
                    <Cell 
                        fill={index.toString() === selectedGraph[0] || index.toString() === selectedGraph[1] ? 'red' : 'black'}
                        id={index.toString()}
                    />
                )})}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="md:w-1/2 h-full">
        <div className="p-2 flex space-x-3 items-center rounded-lg ">
          <button className="bg-indigo-700 mb-3 text-white p-3 rounded-md">
            <IoMdPlay />
          </button>
          <button onClick={bubbleSortHandler} className="bg-indigo-700 mb-3 text-white p-3 rounded-md">
            Sort
          </button>
        </div>
        <MyEditor selectedIndex={selectedLine} />
      </div>

    </main>
  );
}

export default App;
