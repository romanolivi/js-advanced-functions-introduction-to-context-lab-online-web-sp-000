function createEmployeeRecord(array) {
   let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return record 
}

function createEmployeeRecords(array) {
    let recordArray = []
    array.forEach(a => {
        recordArray.push(createEmployeeRecord(a))
    });
    return recordArray
}

function createTimeInEvent(record, dateStamp) {
    let hour = parseInt(dateStamp.split(' ')[1])
    let day = dateStamp.split(' ')[0]
    record.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: day
    });
    return record
}

function createTimeOutEvent(record, dateStamp) {
    let hour = parseInt(dateStamp.split(' ')[1])
    let day = dateStamp.split(' ')[0]
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: day
    });
    return record
}

function hoursWorkedOnDate(record, dateStamp) {
    let timeIn = record.timeInEvents.find(time => time.date === dateStamp)
    let timeOut = record.timeOutEvents.find(time => time.date === dateStamp)
    let hoursWorked = parseInt(timeOut.hour - timeIn.hour)/100
    return hoursWorked
}

function wagesEarnedOnDate(record, dateStamp) {
    let hours = parseInt(hoursWorkedOnDate(record, dateStamp))
    let wagePerHour = parseInt(record.payPerHour)
    let wagesEarned = hours * wagePerHour
    return wagesEarned
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(function(x){
        return x.date
    })

    let pay = dates.reduce(function(total, element){
        return total = total + wagesEarnedOnDate(record, element)
    }, 0)

    return pay
}

function findEmployeeByFirstName(array, name){
    return array.find(a => {return a.firstName === name})
}

function calculatePayroll(records) {
    let wagesArray = records.map(record => allWagesFor(record))
    return wagesArray.reduce((total, element, start = 0) => total = total + element)
}


