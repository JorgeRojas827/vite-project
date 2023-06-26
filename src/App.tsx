import MyEditor from './MyEditor.tsx';
import {ResponsiveContainer, BarChart, CartesianGrid,
  XAxis, YAxis, Tooltip, Bar, Cell,
} from 'recharts';
import { useState } from 'react';
import bubbleSortAlgo from './hooks/sortingBubble.tsx';

const initialData = [
  { name: '3500', value: 3500 },
  { name: '3000', value: 3000 },
  { name: '2000', value: 2000 },
  { name: '2780', value: 2780 },
  { name: '1890', value: 1890 },
  { name: '2390', value: 2390 },
  { name: '3490', value: 3490 },
];

function App() {

  const [selectedLine, setSelectedLine] = useState(1);  
  const [selectedGraph, setSelectedGraph] = useState(['0', '1']);

  const [data, setData] = useState(initialData);
  const [btnCleanDisabled, setBtnCleanDisabled] = useState(false);
  const [btnSortDisabled, setBtnSortDisabled] = useState(false);

  let sortingCompleted = false;
  
  const bubbleSortHandler = () => {
    setBtnSortDisabled(true);
    setBtnCleanDisabled(true);
    
    bubbleSortAlgo(data, setData, setSelectedGraph, setSelectedLine, handleSortingComplete);
    console.log('App', selectedLine)
    
  };
 

  const handleSortingComplete = () => {
    setBtnCleanDisabled(false);
  };

  const cleanBars = () => {
    setData(initialData)
    setSelectedGraph( ['0','1',]);
    setBtnSortDisabled(false);
  }

  return (
    <main className='flex-col md:flex-row justify-between h-screen flex'>
      <div id="algo-info">
            <div id="bubble-info" className="algo-container p-5">
                <h2 className="algo-header text-center text-xl">Bubble Sort</h2>
                <span className="algo-details text-sm">
                  Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares
                  adjacent elements and swaps them if they are in the wrong order.
                </span>
                <span className="algo-complexity pl-4 pr-1 text-sm text-right">
                    <ul>
                        <li className="algo-info"><span className="complexity-item">Worst Complexity</span><span className="complexity-value">N^2</span></li>
                        <li className="algo-info"><span className="complexity-item">Averag Complexity</span><span className="complexity-value">N^2</span></li>
                        <li className="algo-info"><span className="complexity-item">Best Complexity</span><span className="complexity-value">N</span></li>
                        <li className="algo-info"><span className="complexity-item">Space Complexity</span><span className="complexity-value">1</span></li>
                        <li className="algo-info"><span className="complexity-item">Method</span><span className="complexity-value">Exchanging</span></li>
                        <li className="algo-info"><span className="complexity-item">Stable</span><span className="complexity-value">Yes</span></li>
                    </ul>
                </span>
            </div>
      </div>

      <div className="bg-gray-800 flex p-10 space-x-5 text-white w-screen">
        <div className=" md:w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%" >
            <BarChart width={500} height={300} data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d">

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

        <div className="md:w-1/3 h-full">
          <div className="p-2 flex space-x-3 items-center rounded-lg ">
            <button onClick={cleanBars} 
                    className="bg-indigo-700 mb-3 text-white p-3 rounded-md" 
                    disabled={sortingCompleted}
                    style = {{
                      backgroundColor: btnCleanDisabled ? 'gray' : ''
                    }}
                    >
              Clean
            </button>
            <button onClick={bubbleSortHandler} 
                    className="bg-indigo-700 mb-3 text-white p-3 rounded-md"
                    disabled={btnSortDisabled}
                    style = {{
                      backgroundColor: btnSortDisabled ? 'gray' : ''
                    }}
                    >
              Sort
            </button>
          </div>
          <MyEditor selectedIndex={selectedLine} />
        </div>

      </div>

    </main>
  );
}

export default App;
