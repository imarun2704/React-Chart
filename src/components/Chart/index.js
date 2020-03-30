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
        " https://api.thingspeak.com/channels/1023166/feeds.json?api_key=A3EHCB68NAMPXWFD&results="
      )
      .then(data => {
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
          datasets: [{
            label: 'Sales',
            type:'line',
            data: this.props.pressureData,
            fill: false,
            borderColor: '#EC932F',
            backgroundColor: '#EC932F',
            pointBorderColor: '#EC932F',
            pointBackgroundColor: '#EC932F',
            pointHoverBackgroundColor: '#EC932F',
            pointHoverBorderColor: '#EC932F',
            yAxisID: 'y-axis-2'
          },
            {
              label: "Pressure",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: field1
            }
          ]
        };

        this.setState({ data: data1 });

        const data2 = {
          labels: field1Lable,
          datasets: [{
            label: 'Sales',
            type:'line',
            data: this.props.temperatureData,
            fill: false,
            borderColor: '#EC932F',
            backgroundColor: '#EC932F',
            pointBorderColor: '#EC932F',
            pointBackgroundColor: '#EC932F',
            pointHoverBackgroundColor: '#EC932F',
            pointHoverBorderColor: '#EC932F',
            yAxisID: 'y-axis-2'
          },
            {
              
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
            }
          ]
        };

        this.setState({ data2: data2 });

        const data3 = {
          labels: field1Lable,
          datasets: [{
            label: 'Sales',
            type:'line',
            data: this.props.energyData,
            fill: false,
            borderColor: '#EC932F',
            backgroundColor: '#EC932F',
            pointBorderColor: '#EC932F',
            pointBackgroundColor: '#EC932F',
            pointHoverBackgroundColor: '#EC932F',
            pointHoverBorderColor: '#EC932F',
            yAxisID: 'y-axis-2'
          },
            {
              label: "energy",
              backgroundColor: "rgb(255,255,0)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: field3
            }
          ]
        };

        this.setState({ data3: data3 });
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

                <div className="col-md-4"> 
                {this.state.data2.labels && (
                    <Bar
                        data={ this.state.data2}
                        width={50}
                        height={50}
                    />
                    )}
                    </div>
                    <div className="col-md-4"> 
                {this.state.data3.labels && (
                  <Bar
                    data={this.state.data3}
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
