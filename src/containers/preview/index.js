import React from 'react'
import FileViewer from 'react-file-viewer';
const type = 'pdf'
const DocPreview = (props) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Preview Section</h5>
      {/* <FileViewer
        fileType='pdf'
        filePath={props.current.data}
        // errorComponent={CustomErrorComponent}
        // onError={this.onError}
        /> */}
        {/* <FileViewer
        fileType={type}
        filePath={props.current.data}
        // errorComponent={CustomErrorComponent}
        /> */}
        <iframe src={props.current.file_path} width="540" height="450"></iframe>
      <h5 className="card-title">{props.current.data}</h5>
    </div>
  </div>
)

export default DocPreview
