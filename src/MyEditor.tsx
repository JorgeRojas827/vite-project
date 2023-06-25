import React from 'react';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/esm-resolver';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github.js';


function MyEditor() {
    const onChange = (newValue: any) => {
      console.log('Editor content:', newValue);
    };

    return (
        <AceEditor
          mode="c_cpp"
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