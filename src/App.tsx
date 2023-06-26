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

  const [selectedLine, setSelectedLine] = useState(12);  
  const [selectedGraph, setSelectedGraph] = useState(['0', '1']);

  const [data, setData] = useState(initialData);
  const [btnCleanDisabled, setBtnCleanDisabled] = useState(false);
  const [btnSortDisabled, setBtnSortDisabled] = useState(false);

  const [selectedOption, setSelectedOption] = useState('bubble');
  console.log('option: ', selectedOption)

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  
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
  
  let titleSort = '';
  let bodySort = '';
  let dataSort = ["", "", "", "", "", "", ""];  //array

  switch (selectedOption) {
    case 'bubble':
      titleSort = 'Bubble'
      bodySort = 'Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
      dataSort = ['N^2', 'N^2', 'N', '1', 'Exchanging', 'Yes']
    break;
    case 'selection':
      titleSort = 'Selection'
      bodySort = 'Selection Sort is a sorting algorithm, specifically an in-place comparison sort. It has O time complexity, making it inefficient on large lists, and generally performs worse than the similar insertion sort'
      dataSort = ['N^2', 'N^2', 'N^2', '1', 'Selection', 'No']
    break;
    case 'insertion':
      titleSort = 'Insertion'
      bodySort = 'Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.'
      dataSort = ['N^2', 'N^2', 'N', '1', 'Insertion', 'Yes']
    break;

    default:
      break;
  }

  return (
    <main className='flex-col md:flex-row justify-between h-screen flex'>
      <div id="algo-info">
            <div id="bubble-info" className="algo-container p-5 text-white">
                <h2 className="algo-header text-center text-xl font-extrabold">{titleSort} sort</h2>
                <span className="algo-details text-sm">{bodySort}</span>
                <span className="algo-complexity pl-4 pr-1 text-sm text-right">
                    <ul className='font-bold'> 
                        <div className='pl-12 pb-4'>Complexity</div>
                        <li className="algo-info font-light list-disc"><span className="complexity-item">Worst</span><span className="complexity-value">{dataSort[0]}</span></li>
                        <li className="algo-info font-light list-disc"><span className="complexity-item">Average</span><span className="complexity-value">{dataSort[1]}</span></li>
                        <li className="algo-info font-light list-disc"><span className="complexity-item">Best</span><span className="complexity-value">{dataSort[2]}</span></li>
                        <li className="algo-info font-light list-disc"><span className="complexity-item">Space</span><span className="complexity-value">{dataSort[3]}</span></li>
                        <li className="algo-info font-light list-disc"><span className="complexity-item">Method</span><span className="complexity-value">{dataSort[4]}</span></li>
                        <li className="algo-info font-light list-disc"><span className="complexity-item">Stable</span><span className="complexity-value">{dataSort[5]}</span></li>
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
                          fill={
                            (index.toString() === selectedGraph[0]) || 
                            (index.toString() === selectedGraph[1]) ? 'red' : 'black'}
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
                    disabled={btnCleanDisabled}
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
            <div>
              <select value={selectedOption} onChange={handleOptionChange} className='text-white rounded-lg mb-3 p-3 bg-indigo-700'>
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion</option>
              </select>

            </div>
          </div>
          <MyEditor selectedIndex={selectedLine} />
        </div>

      </div>

    </main>
  );
}

export default App;
