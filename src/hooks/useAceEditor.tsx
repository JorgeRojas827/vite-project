import React from 'react'
import { useStateCallback } from './useStateCallback'
import ace from 'ace-builds/src-noconflict/ace';

interface iprops {
    ref: any
}

export const useAceEditor = ({ref}: iprops) => {
    const Range = ace.require('ace/range').Range;

    const setline  = (selected: number) => {
        
    const prevMarkers = ref.current.editor.session.getMarkers();
    if (prevMarkers) {
        const prevMarkersArr = Object.keys(prevMarkers);
        for (let item of prevMarkersArr) {
            ref.current.editor.session.removeMarker(prevMarkers[item].id);
        }
    }
    ref.current.editor.session.addMarker(new Range(selected-1, selected, selected-1, 0), "foo", "fullLine");
   }

  return {
    setline
  }
}
