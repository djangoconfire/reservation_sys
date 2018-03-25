import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimeComponent from './timeComponent';
import CalendarComponent from './calendar';
import ClientComponent from './client';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import { SERVER_URL }  from '../../constants';


const styles = {
	headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  	},
};

class ReservationBox extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	tabVal : "0",	
	    	reservationData : []
		}
	}

	handleChange = (value) =>{
		this.setState({
			tabVal : value
		})
	}

	tabChange = (Data) =>{
		var reservedData = this.state.reservationData;
		if("selectedTime" in Data){
			reservedData.push({'selectedTime' : Data.selectedTime})
			this.setState({reservationData : reservedData})
		}
		if("selectedDate" in Data){
			reservedData.push({'selectedDate' : Data.selectedDate})
			this.setState({reservationData : reservedData})
		}
		this.setState({tabVal : Data.tabVal})
	}

	reserveSlot = (data) =>{
		const reservationData = this.state.reservationData
		reservationData.push({'userData' : data});
		console.log(reservationData)
		const payload = {
			"selectedDate" : reservationData[0]['selectedDate'],
			"selectedTime" : reservationData[1]['selectedTime'],
			"userData" : reservationData[2]['userData']
		}
		let header = new Headers({
		    'Access-Control-Allow-Origin':'*',
		    'Content-Type': 'application/json'
		});

		let url = SERVER_URL + '/api/slot/reserve';
		axios.post(url,payload,{headers : header})
		.then((res)=>{
			console.log("Response",res)
		})
		.catch(err =>{
			return err
		})
	}

	render(){
		return(
			<MuiThemeProvider>
				<AppBar
                    title="Book Slot"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
				<Tabs
		        	value={this.state.tabVal}
		        	onChange={this.handleChange}
		      	>
		        	<Tab label="Date" value="0">
			         	<div>
			           		<CalendarComponent tabChange={this.tabChange}/>
			          	</div>
		        	</Tab>
			        <Tab label="Time" value="1">
			          	<div>
			            	<TimeComponent tabChange={this.tabChange}/>
			          	</div>
			        </Tab>

			         <Tab label="Client" value="2">
			          	<div>
			            	<ClientComponent reserveSlot={this.reserveSlot}/>
			          	</div>
			        </Tab>
      			</Tabs>
			</MuiThemeProvider>
		);
	}

}

export default ReservationBox;