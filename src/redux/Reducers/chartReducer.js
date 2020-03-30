import { lineDataActionType } from './../ActionTypes/chartTypes';
const INITIAL_STATE = {

            pressureLineData: [],
            temperatureLineData:[],
            energyLineData:[]

    
}

const lineChartReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type) {
       case lineDataActionType.LINE_DATA:
          
             return {
                 ...state,
                 pressureLineData: [2,3,6,8,6,4,2,3,4,5,6,5,6,5,6,7,3,4,5,6,2,5,6,7,5,4],
                 temperatureLineData:[50,58,65,78,56,34,23,67,78,89,45,34,45,56,67,78,89,34,45,67,74,67,78,90,45,67],
                 energyLineData:[15,20,23,34,38,23,34,38,12,16,19,23,27,29,34,37,39,18,20,21,22,23,24]
             };


       default:   
             return state;
    }
} 

export default lineChartReducer;