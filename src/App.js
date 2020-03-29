import React from "react";
import "./App.css";
import axios from "axios";
import moment from 'moment';
import { Bar } from "react-chartjs-2";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      data: {},
      data2:{},
      data3:{}
    };
  }

  fetch = () => {
    axios
      .get(
        " https://api.thingspeak.com/channels/1023166/feeds.json?api_key=A3EHCB68NAMPXWFD&results="
      )
      .then(data => {
        console.log(data.data.feeds.map(el => el.created_at))
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
          datasets: [
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
          datasets: [
            {
              label: "temperature",
              backgroundColor: "rgb(0,0,128)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: field2
            }
          ]
        };

        this.setState({ data2: data2 });

        const data3 = {
          labels: field1Lable,
          datasets: [
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
    return (
      <div className="App">
        <button onClick={this.fetch} >click to get data</button>
        {this.state.data.labels && (
          <Bar
            data={this.state.data && this.state.data}
            width={100}
            height={50}
          />
        )}

        {this.state.data2.labels && (
                  <Bar
                    data={this.state.data2 && this.state.data2}
                    width={100}
                    height={50}
                  />
                )}

        {this.state.data3.labels && (
                  <Bar
                    data={this.state.data3 && this.state.data3}
                    width={100}
                    height={50}
                  />
                )}
      </div>
    );
  }
}

export default App;
