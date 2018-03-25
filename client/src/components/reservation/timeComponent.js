import React from 'react';
import TextField from 'material-ui/TextField';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';


const styles = {
    gridList: {
        width: 550,
    }
};

export default class TimeComponent extends React.Component {

    constructor(props) {
        super(props);
            const slots = [];
            var c = 0 ;
            for(var i=0 ; i< 14 ; i++){
                if(i < 5){
                    slots.push({
                        id : i + 1,
                        time : (8 + i).toString() + ":00" + " " + "AM",
                        btnColor: "#ffffff",
                        disabled: false
                    })
                }else{
                    slots.push({
                        id : i + 1,
                        time : (1 + c).toString() + ":00" + " " + "PM",
                        btnColor: "#ffffff",
                        disabled: false
                    }) 

                    c += 1 ;
                }
            }

            this.state = {
                slots: slots
            };
    }

    handleClick(id) {
        let slotsCopy = JSON.parse(JSON.stringify(this.state.slots))
        slotsCopy[id - 1].btnColor = '#64B5F6'
        slotsCopy[id - 1].disabled = true
        this.setState({
            slots: slotsCopy
        })
        setTimeout(() =>{
            this.props.tabChange({'tabVal': '2','selectedTime' : slotsCopy[id - 1]['time']})
        },1000)
        
    };

    render() {
        return (
            <div>
                <GridList
                    cellHeight={80}
                    style={styles.gridList}
                    >
                    {this.state.slots.map((slot,i) => (
                        < GridTile >
                            <FlatButton 
                                id={slot.id} 
                                value={slot.id} 
                                label={slot.time} 
                                secondary={true} 
                                style={{ "backgroundColor": slot.btnColor, "border": 'solid', width: "250px", "borderColor": 'black', "opacity": 1 }} 
                                disabled={slot.disabled} 
                                onKeyboardFocus={() => { this.setState }} 
                                onClick={() => { this.handleClick(slot.id) }} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
    }
}