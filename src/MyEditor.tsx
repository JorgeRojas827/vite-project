import React, { useRef, useEffect, FC } from 'react';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/esm-resolver';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github.js';
import { useAceEditor } from './hooks/useAceEditor';

interface IProps {
  selectedIndex: any;
}

const MyEditor: FC<IProps> = ({ selectedIndex }) => {
  console.log('MyEditor:', selectedIndex);

  const editor = useRef<any>(null);
  const { setline } = useAceEditor({ ref: editor });

  useEffect(() => {
    setline(Number(selectedIndex));
  }, [selectedIndex]);

  return (
    <AceEditor
      mode="c_cpp"
      ref={editor}
      theme="github"
      value={`${`// Bubble sort in C++
void bubbleSort(int array[], int size) {

  // loop to access each array element
  for (int step = 0; step < size; ++step) { //3
      
    // loop to compare array elements
    for (int i = 0; i < size - step; ++i) { //6

      // compare two adjacent elements
      // change > to < to sort in descending order
      if (array[i] > array[i + 1]) {

        // swapping elements if elements
        // are not in the intended order
        int temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
      }
    }
  }
}         
      `}`}
    />
  );
};

export default MyEditor;
