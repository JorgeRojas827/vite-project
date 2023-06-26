import React from 'react'
import { useAceEditor } from './useAceEditor';

//const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const for1 = 5;
const for2 = 8;
const if1 = 12;
const cambioVar = 16;

function bubbleSort(data: { name: string; uv: number }[], setData: React.Dispatch<React.SetStateAction<{ name: string; uv: number }[]>>, 
    setSelectedGraph: React.Dispatch<React.SetStateAction<string[]>>, setSelectedLine: React.Dispatch<React.SetStateAction<number>>) {
    let sortedData = [...data];
    let i = 0;
    let j = 0;

    const timer = setInterval( () => {

      if (i < sortedData.length - 1) {

        if (j < sortedData.length - i - 1) {

          if (sortedData[j].uv > sortedData[j + 1].uv) {

            setSelectedGraph([
              (Number(j)).toString(),
              (Number(j+1)).toString(),
            ]);
            setSelectedLine(if1);
            //await delay(1000);

            const temp = sortedData[j];
            sortedData[j] = sortedData[j + 1];
            sortedData[j + 1] = temp;

            setSelectedLine(cambioVar);
            //await delay(1000);
            setData([...sortedData]);

          }
          j++;
          setSelectedLine(for2);
          //await delay(1000);

        } else {
          setSelectedLine(for1);
          //await delay(1000);
            i++;
            j = 0;
        }
        
      } else {
        clearInterval(timer);
      }

    }, 1000);
  }

  export default bubbleSort;
  