import React from 'react'

const posCod_forsArray = [
  5,
  8,
  12,
  16,
  17,
  18
]


function bubbleSortStep(arr: { name: string; value: number; } []) {
  let sorted = true;
  let swappedIndexes = [];

  // Perform one step of bubble sort
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].value > arr[i + 1].value) {
      // Swap elements if they are in the wrong order
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      sorted = false;
      swappedIndexes.push(i, i + 1);
      break; // Perform only one swap per step
    }
  }

  // Return the sorted array and the swapped indexes for this step
  return { sortedArray: arr, isSorted: sorted, swappedIndexes };
}

function bubbleSortAlgo(data: { name: string; value: number }[], setData: React.Dispatch<React.SetStateAction<{ name: string; value: number }[]>>, 
    setSelectedGraph: React.Dispatch<React.SetStateAction<string[]>>, setSelectedLine: React.Dispatch<React.SetStateAction<number>>,
    handleSortingComplete: () => void)
    {
      
    let sortedData = [...data];

    let unsortedArray = sortedData;
    let cambios;

    const delayAnimacion = 100;

    // Perform the bubble sort step by step
    function performSortStep() {

      const { sortedArray, isSorted, swappedIndexes: swappedIndexes } = bubbleSortStep(unsortedArray);
      unsortedArray = sortedArray;
      cambios = swappedIndexes;

      // Display the current state
      console.log(sortedArray);

      if (!isSorted) {
        
        setSelectedGraph( [
          (Number(cambios[0])).toString(),
          (Number(cambios[1])).toString(),
        ]);
        
        setData([...sortedData]);


        let count = 0;
        const interval = setInterval(() => {
          setSelectedLine( posCod_forsArray[count] );
          count++;

          if (count > posCod_forsArray.length-1) {
            clearInterval(interval);
          }
        }, delayAnimacion);

        // Call the next step after a delay
        setTimeout(performSortStep, delayAnimacion*(posCod_forsArray.length)+1500);
        
      }else{
        handleSortingComplete()
      }
    }
    
    // Start the sorting process
    performSortStep();
    setSelectedLine(0);
  }
  

    
  export default bubbleSortAlgo;
  