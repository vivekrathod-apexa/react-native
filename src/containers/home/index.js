import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getDocumentList} from '../../modules/counter'
import DocPreview from '../preview';
import axios, { post } from 'axios';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentDoc : {} };
    
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  
  onChange(e) {
    
    if(e.target.files[0]){
    e.preventDefault();
    this.fileUpload(e.target.files[0]).then((response)=>{
      if(response.data.code=='200'){
        alert(response.data.message);
        this.props.getDocumentList();
      }
      else{
        alert('Error in Uploading File.');
      }
    })
    }
  }

  
  fileUpload(file){
    const url = 'http://localhost/laravel/public/api/fieupload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }
  
  componentDidMount() {
    this.props.getDocumentList();
    console.log("sa", this.props)
  }

  componentWillUnmount() {
    
  }

  changeDoc(index){
      this.setState(
          {currentDoc : this.props.docList[index]}
      );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                Upload Document
                  <input name="file" type="file" onChange={this.onChange} />
              </div>
              <ul className="list-group list-group-flush ">
                {this.props.docList.map((value, index) => {
                  return <li onClick={() => { this.changeDoc(index) }} key={index} className={`list-group-item ${this.state.currentDoc&&this.state.currentDoc.id==value.id ? 'active':''}`}>{value.filename}</li>
                })}
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            {this.state.currentDoc && <DocPreview current={this.state.currentDoc}/>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ counter }) => ({
  docList: counter.docList || [],
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getDocumentList,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
