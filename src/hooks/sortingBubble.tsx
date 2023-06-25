import React from 'react'

function bubbleSort(data: { name: string; uv: number }[], setData: React.Dispatch<React.SetStateAction<{ name: string; uv: number }[]>>, setSelectedGraph: React.Dispatch<React.SetStateAction<string[]>>) {
    let sortedData = [...data];
    let i = 0;
    let j = 0;
    const timer = setInterval(() => {
      if (i < sortedData.length - 1) {
        if (j < sortedData.length - i - 1) {
          if (sortedData[j].uv > sortedData[j + 1].uv) {
            const temp = sortedData[j];
            sortedData[j] = sortedData[j + 1];
            sortedData[j + 1] = temp;
            setData([...sortedData]);
          }

          setSelectedGraph([
            (Number(j)).toString(),
            (Number(j+1)).toString(),
          ]);

          j++;
        } else {
          i++;
          j = 0;
        }
      } else {
        clearInterval(timer);
      }
    }, 500);
  }
  
  export default bubbleSort;
  