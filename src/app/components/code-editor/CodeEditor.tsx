"use client";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { TILE_COL_COUNT, TILE_SIZE } from "@/game/const";

export default function CodeEditor({ 
  value, 
  onChange
}: { 
  value: string, 
  onChange: (value: string) => void
}) {
  const onLoad = () => {};

  return (
    <AceEditor
      style={{
        height: `${(TILE_SIZE * TILE_COL_COUNT) + 8}px`,
        width: "auto",
        borderRadius: "8px"
      }}
      placeholder="Write here your code..."
      mode="javascript"
      theme="monokai"
      name="blah2"
      onLoad={onLoad}
      onChange={onChange}
      fontSize={13}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={value}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        dragEnabled: false,
      }}/>
    )
}