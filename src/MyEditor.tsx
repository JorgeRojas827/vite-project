import React, {useRef, useLayoutEffect} from 'react';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/esm-resolver';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github.js';
import { useAceEditor } from './hooks/useAceEditor';


function MyEditor() {
    const onChange = (newValue: any) => {
      console.log('Editor content:', newValue);
    };
    const editor = useRef<any>(null)
    const { setline } = useAceEditor({ref: editor});

    useLayoutEffect(() => {
      const interval = setInterval(() => {
        setline(3)
      }, 2000)
      
      return () => {
        clearInterval(interval)
      }
    }, [])

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
          onChange={onChange}
          markers = {[{
              startRow: 3,
              startCol: 3,
              endRow: 3,
              endCol: 0,
              className: "test-marker",
              type: "text"
            }]}
        />
    );
  }

  export default MyEditor;