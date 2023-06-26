import MyEditor from './MyEditor.tsx';
import {ResponsiveContainer, BarChart, CartesianGrid,
  XAxis, YAxis, Tooltip, Bar, Cell,
} from 'recharts';
import { useState } from 'react';
import { IoMdPlay } from 'react-icons/io';
import bubbleSort from './hooks/sortingBubble.tsx';


function App() {

  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const posCod = {
    for1: 5,
    for2: 8,
    if1: 12,
    cambioVar: 16,
    fin:23
  };

  const [data, setData] = useState([
    {name: '3500', uv: 3500,},
    {name: '3000', uv: 3000,},
    {name: '2000', uv: 2000,},
    {name: '2000', uv: 2780,},
    {name: '1890', uv: 1890,},
    {name: '2390', uv: 2390,},
    {name: '3490', uv: 3490,},
  ]);
  
  const [selectedLine, setSelectedLine] = useState(1);
  const [selectIndex, setSelectedIndex] = useState('0');
  
  const [selectedGraph, setSelectedGraph] = useState(['0', '1']);
  
  /*const bubbleSortHandler = () => {
    bubbleSort(data, setData, setSelectedGraph, setSelectedLine);
    console.log('App', selectedLine)
  };*/

  const bubbleSort = () => {
    let sortedData = [...data];
    let i = 0;
    let j = 0;
    let a = 1;
    let contador = 0;
    const timer = setInterval(async () => {
      
      if (i < sortedData.length - 1) {
        setSelectedLine( posCod.for1 );
        await delay(2000);
        
        if (j < sortedData.length - i - 1) {
          setSelectedLine( posCod.for2 );
          await delay(2000);

          if (sortedData[j].uv > sortedData[j + 1].uv) {

            setSelectedLine( posCod.cambioVar );
            await delay(2000);
            contador = posCod.cambioVar;

            const temp = sortedData[j];
            sortedData[j] = sortedData[j + 1];
            sortedData[j + 1] = temp;

            setData([...sortedData]);
          }

          if (contador=posCod.cambioVar)
            { setSelectedGraph( [
              (Number(5)).toString(),
              (Number(6)).toString(),
            ]);
            }
          setSelectedLine(contador);
          await delay(2000);
          
          j++;

        } else {
          contador = posCod.for2;
          i++;
          j = 0;
        }

      } else {
        clearInterval(timer);
      }
    }, 500);
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
                  <Cell fill={index.toString() === selectedGraph[0] || index.toString() === selectedGraph[1] ? 'red' : 'black'}
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
          <button onClick={bubbleSort} className="bg-indigo-700 mb-3 text-white p-3 rounded-md">
            Sort
          </button>
        </div>
        <MyEditor selectedIndex={selectedLine} />
      </div>

    </main>
  );
}

export default App;
