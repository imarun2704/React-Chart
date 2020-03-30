import React from "react";
import axios from "axios";
import moment from 'moment';
import { Bar } from "react-chartjs-2";
import { connect } from 'react-redux';
import {setLineData} from './../../redux/Actions/chartActions';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      data: {},
      data2:{},
      data3:{},
      options:{},
      plugins:[]
    };
  }

  fetch = () => {
    axios
      .get(
        "https://api.thingspeak.com/channels/1023166/feeds.json?api_key=A3EHCB68NAMPXWFD&results="
      )
      .then(data => {
          console.log('mmmmmmmmmmmmmmmmm')
        this.props.setLineData();
        this.setState({ click: true });

        let field1Lable = [];
        let field1 = [];
        let field2 = [];
        let field3 = [];

        data.data.feeds.map(obj =>  {
          if (obj ) {
            field1Lable.push(moment(obj.created_at).format("MMM Do YY"));
            field1.push(Number(obj.field1));
            field2.push(Number(obj.field2));
            field3.push(Number(obj.field3));
          }
        });

        const data1 = {
          labels: field1Lable,
          datasets: [ {
              
            label: "temperature",
            type:"bar",
            fill: false,
            backgroundColor: "rgb(0,0,128)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: field2,
            yAxisID: 'y-axis-1'
          },
            {
              label: "Pressure",
              type:"line",
              fill: false,
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: field1
            }, {
                label: "energy",
                type:"line",
                fill: false,
                backgroundColor: "rgb(255,255,0)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: field3
              }
          ]
        };

        this.setState({ data: data1 });

         });
  };



  render() {
    const height = '300px'
    return (
      <div className="App">
        <button onClick={this.fetch} >click to get data</button>
             <div className="col-md-4" style={{minHeight:height}}> 
                {this.state.data.labels && (
                <Bar
                    data={ this.state.data}
                    width={50}
                    height={50}
                />
                )}
                </div>
               
      </div>
    );
  }
}
const mapStateToProps = ({ lineChartReducer }) => ({
    pressureData: lineChartReducer.pressureLineData,
    temperatureData:lineChartReducer.temperatureLineData,
    energyData:lineChartReducer.energyLineData
   });
const mapDispatchToProps = dispatch => ({
    setLineData: () => dispatch(setLineData())
 });
 
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
