import MyEditor from './MyEditor.tsx';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from 'recharts';
import { useEffect, useRef, useState } from 'react';
import { IoMdPlay } from 'react-icons/io';
import bubbleSort from './hooks/sortingBubble.tsx';
import { useStateCallback } from './hooks/useStateCallback.tsx';

const initialData = [
  { name: '3500', valor: 3500 },
  { name: '3000', valor: 3000 },
  { name: '2000', valor: 2000 },
  { name: '2780', valor: 2780 },
  { name: '1890', valor: 1890 },
  { name: '2390', valor: 2390 },
  { name: '3490', valor: 3490 },
];

function App1() {
  const posCod = {
    for1: 5,
    for2: 8,
    if1: 12,
    cambioVar: 16,
    fin: 23,
  };

  const [data, setData] = useState(initialData);

  const currentInterval = useRef<any>();
  const currentI = useRef<any>(0);
  const currentJ = useRef<any>(0);
  const [selectedLine, setSelectedLine] = useStateCallback(2);
  const [selectIndex, setSelectedIndex] = useState('0');
  const [isSorting, setIsSorting] = useState(false);

  const [selectedGraph, setSelectedGraph] = useState(['0', '1']);

  /*const bubbleSortHandler = () => {
    bubbleSort(data, setData, setSelectedGraph, setSelectedLine);
    console.log('App', selectedLine)
  };*/

  useEffect(() => {
    if (selectedLine === -1) {
      bubbleSort();
    }
    return () => {
      if (selectedLine !== -1) {
        clearInterval(currentInterval.current);
        setIsSorting(false);
      }
    };
  }, [selectedLine]);

  const bubbleSort = () => {
    let sortedData = [...data];
    let i = currentI.current;
    let j = currentJ.current;
    let a = 1;
    currentInterval.current = setInterval(async () => {
      setSelectedLine(2);
      setTimeout(() => {
        if (i < sortedData.length - 1) {
          setSelectedLine(posCod.for1);
          setTimeout(() => {
            if (j < sortedData.length - i - 1) {
              setSelectedLine(posCod.for2);
              setTimeout(() => {
                setSelectedLine(posCod.if1);
                setTimeout(() => {
                  if (sortedData[j].valor > sortedData[j + 1].valor) {
                    const temp = sortedData[j];
                    sortedData[j] = sortedData[j + 1];
                    sortedData[j + 1] = temp;
                    setSelectedLine(posCod.cambioVar);
                    setTimeout(() => {
                      setSelectedGraph([
                        Number(j).toString(),
                        Number(j + 1).toString(),
                      ]);

                      setData([...sortedData]);
                      setSelectedLine(posCod.fin);
                      setTimeout(() => {
                        setSelectedLine(-1);
                      }, 500);
                    }, 500);
                  } else {
                    setSelectedLine(-1);
                  }

                  j++;
                  currentJ.current = j;
                }, 500);
              }, 500);
            } else {
              i++;
              currentI.current = i;
              j = 0;
              currentJ.current = j;
            }
          }, 500);
        } else {
          clearInterval(currentInterval.current);
        }
      }, 500);
    }, 500);
  };

  const cleanUp = () => {
    currentI.current = 0;
    currentJ.current = 0;
    setData(initialData);
  };

  return (
    <main className="bg-gray-800 flex p-20 space-x-5 flex-col md:flex-row justify-between w-screen h-screen text-white">
      <div className=" md:w-1/2 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" fill="#82ca9d">
              {/*<LabelList dataKey='name' position="middle" dy={-10} fill="white" fontSize={12} fontWeight="bold"/>*/}

              {data.map((e, index) => {
                return (
                  <Cell
                    key={index}
                    fill={
                      index.toString() === selectedGraph[0] ||
                      index.toString() === selectedGraph[1]
                        ? 'rgb(49, 46, 129)'
                        : 'rgb(15, 23, 42)'
                    }
                    id={index.toString()}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="md:w-1/2 h-full">
        <div className="p-2 flex space-x-3 items-center rounded-lg ">
          <button className="bg-indigo-700 bg-indigo-900 mb-3 text-white p-3 rounded-md">
            <IoMdPlay />
          </button>
          <button
            onClick={bubbleSort}
            className="bg-indigo-700 mb-3 text-white p-3 rounded-md"
          >
            Sort
          </button>
        </div>
        <MyEditor selectedIndex={selectedLine} />
      </div>
    </main>
  );
}

export default App1;