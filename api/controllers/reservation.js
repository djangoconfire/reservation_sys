const Reservation = require('../models/reservation');


exports.reservation = (req,res,next) =>{

    //Get list of available hours for selected date
    var selectedDate = req.body.selectedDate;
    var selectedHour = req.body.selectedTime;
    var userData = req.body.userData;

    console.log("Selected date: " + selectedDate);
    console.log("Selected hour: " + selectedHour);
    console.log("User data: " + JSON.stringify(userData));

    const newReservation = new Reservation({
        date : selectedDate,
    })
    newReservation.hours.push(selectedHour)
    newReservation.hours.userData = userData
    newReservation.save(function(err , obj){
            console.log("Resposne",obj)
        })
    }


exports.getAvailableHours = (req, res, next) =>{
    console.log("BOdy",req.body);
    var selectedDate = req.query.selectedDate.split('T')[0];
    console.log("Selected date: " + selectedDate);

    Reservation.findOne({}).
        where('date').equals(selectedDate).
        sort('hour').
        lean().
        exec(function (err, schedule) {
            if (err) return handleError(err);

            console.log("Schedule for selected date: " + JSON.stringify(schedule));
            var response = {};
            response.availableHours = [];

            if (schedule) {
                var notAvailableCount = 0;
                for (var i = 0; i < schedule.hours.length; i++) {
                    var hour = schedule.hours[i];

                    if (hour.available) {
                        response.availableHours.push(hour.hour);

                    } else {
                        notAvailableCount++;
                    }
                }

                if (notAvailableCount === schedule.hours.length) {
                    //No available hours for selected date
                    console.log("No available hours for selected date");
                    //response.status = "WARNING";
                    response.status = "SUCCESS";
                    response.message = "noAvailableHoursForSelectedDate";

                } else {
                    //Available hours for selected date
                    console.log("Available hours for selected date: " + JSON.stringify(response.availableHours));
                    response.status = "SUCCESS";
                    response.message = "";
                }

            } else {
                //No schedule for selected date
                console.log("No available schedule for selected date");
                //response.status = "ERROR";
                response.status = "SUCCESS";
                response.message = "noAvailableScheduleForSelectedDate";
            }

            res.json(response);
        });
    }


exports.get_all_reservations = (req,res,next) => {
    Reservation.find()
    .exec()
    .then(doc =>{
        if(reservations){
            return res.status(200).json(reservations)
        }else{
            return res.status(404).json({message : "Data not found"});
        }
    })
    .catch(err =>{
        return res.status(400).json({error : err});
    })

};