import React, { Fragment } from 'react';
import $, { data } from "jquery";
import axios from 'axios';
import { Link } from 'react-router-dom';


class UploadForm extends React.Component{
    constructor(){
        super();
        this.state = {
            clicked: false,
            selectedFile: null,
            data:[]
            
        };
    }

    componentDidMount(){
        $("#uploadTrigger").click(function(){
            $("#uploadFile").click();
         });
    }

    searchImage = (event) =>{
        const value = this.state.clicked;
        let my_list = []
        this.setState({
            clicked: !value
        });

        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post("http://127.0.0.1:5000/api/show",fd)
        .then( res => {
            let t = JSON.parse(res.data)
            console.log(t)
            this.setState({data:t}) 
        });
    }

    refreshPage = ()=>{
      window.location.reload(false)
    }

    fileChanged = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    render(){
          const result_style = {margin: "auto",
            "background-color": "#fff",
            "margin-top": "3.25rem",
            "opacity": "0.8",
            "padding": "0px",
            "margin-bottom": "3.25rem",
            "margin-left": "60px"}

            const uploadImage = {
              "height": "150px",
              "width": "200px",
              "margin-top": "20px"
          }
        if(this.state.clicked){
            return(  
              <Fragment>  
                <div className="container uploadContainer">
                    <h1 className="centerText">Results</h1>
                    <div className='row'>
                    {
                        this.state.data.map(function (feature) {
                        return (
                          <div>
                          <div className="row justify-content-end" >   
                        <div style={result_style}>
                            <div className="col-md-4">
                                <img src={"./flowers"+feature.image }style = {uploadImage}></img>                              
                        </div>
                            <div >
                                <div className="card-body">
                        <p className="card-text">confidence offset in database : {feature.condifence}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        )  
               })
            }     
                    </div> 
                    <div className='row'>
                    <div className='col-6 offset-5'>
                    <button className="btn btn-primary"  onClick = {this.refreshPage}>Try Again
                      </button> 
                      </div> 
                    </div>
    
                                     
                </div>
                
                </Fragment>  
            )
                             
        }else{
            return(
                <div className="container uploadContainer">
                    <h1 className="centerText">Start your search here</h1>
                    <div className="container">
                    <div className="row">
                        <div className="container fileUpload">
                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-2 imageFile">
                                <form >
                                    <div className="input-group-append" id="button-addon4">
                                        <input type="file" className="hidden" id="uploadFile" onChange={this.fileChanged}/>
                                        <div className="button" id="uploadTrigger"><img src="fileUpload.png" className="upload uploadForm"/></div>
                                    </div>
                                </form>
                                </div>
                                <div className="col-sm-5">
                                        <h4>Please Upload Your Image here.</h4>
                                        <p>We will search our database based on that image.</p>
                                        <button className="btn btn-primary" onClick={this.searchImage}>Search</button>
                                </div>
                                <div className="col-sm-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                
            )
        }
    }
}

export default UploadForm;