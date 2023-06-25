/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, FC } from 'react';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/esm-resolver';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github.js';
import { useAceEditor } from './hooks/useAceEditor';

interface IProps {
  selectedGraph: any;
}

const MyEditor: FC<IProps> = ({ selectedGraph }) => {
  console.log(selectedGraph);

  const editor = useRef<any>(null);
  const { setline } = useAceEditor({ ref: editor });

  useEffect(() => {
    setline(Number(selectedGraph));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGraph]);

  return (
    <AceEditor
      mode="c_cpp"
      ref={editor}
      theme="github"
      value={`${`
          console.log('Hello, World!');
          using namespace std;
          int main(){
              cout << 'Hola mundo' << endl;
              aasadasdasdasd
          }
          `}`}
      markers={[
        {
          startRow: 3,
          startCol: 3,
          endRow: 3,
          endCol: 0,
          className: 'test-marker',
          type: 'text',
        },
      ]}
    />
  );
};

export default MyEditor;
