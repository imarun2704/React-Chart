import { combineReducers } from 'redux';

import  lineChartReducer from './Reducers/chartReducer';

export default combineReducers({
    lineChartReducer: lineChartReducer,

});