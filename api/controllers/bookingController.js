//http://momentjs.com/timezone/docs/#/using-timezones/
var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');
var _ = require('lodash');
var moment = require('moment-timezone').tz.setDefault('Europe/Madrid');

var BookingController = {};

BookingController.createBooking = function createBooking (options) {
  var booking = new Parse.Object('Booking');
  var dd = moment(options.startDate);
  var node =new Date(dd);
  var dd1 = moment(options.endDate);
  var node1 =new Date(dd1);
  booking.set('status',true);
  booking.set('state',options.state); //0 activa, 1 finalizada, 2 eliminada, 3 no presentada
  booking.set('startDate',node);
  booking.set('endDate',node1);
  booking.set('duration',options.duration);
  booking.set('additionalInfo',options.additionalInfo);
  booking.set('employee', {"__type":"Pointer","className":"_User","objectId":options.employee});
  booking.set('client', {"__type":"Pointer","className":"_User","objectId":options.client});
  booking.set('service', {"__type":"Pointer","className":"Service","objectId":options.service});
  booking.set('business', {"__type":"Pointer","className":"Business","objectId":options.business});

  var acl = new Parse.ACL();
  acl.setPublicWriteAccess(true);
  acl.setPublicReadAccess(true);
  booking.setACL(acl);
  return booking.save().then(function(saveData) {
      // The save was successful.
      return {ready:true,successful:'Created Booking',id:saveData.id};
    }, function(error) {
      console.log('Booking Save Error',error);
      return {ready:false,error:'Booking Save Error '+error};
    });

};

BookingController.getBooking = function getBooking (idB) {
  if (idB!=0) {
    var query = new Parse.Query('Booking');
    query.include('client.name');
    query.include('business');
    query.include('employee');
    query.include('service');
    query.equalTo('business', new Parse.Object('Business', { id:idB}));
    query.equalTo('status',true);
    return query.find({
      success: function(object) {
      },
      error: function(error) {
        // error is an instance of Parse.Error.
        console.log('error search Booking');
        console.log('%j',error);
      }
    });
  }else {
    return [];
  }
};

BookingController.updateBooking = function updateBooking (idB,options) {
  var query = new Parse.Query('Booking');
  return query.get(idB).then(function(dataC){
    if (options.deleteBooking=='true') {
      dataC.set('status',true ? options.status=='true':false);
      dataC.set('state',options.state);
    }else {
      var startA = moment(options.startDate);
      var node =new Date(startA);
      var startB = moment(options.endDate);
      var node1 =new Date(startB);
      if (options.status) dataC.set({'status':options.status});
      if (options.state) dataC.set({'state':options.state});
      if (options.startDate) dataC.set('startDate',node);
      if (options.endDate) dataC.set('endDate',node1);
      if (options.duration) dataC.set({'duration':options.duration});
      if (options.additionalInfo) dataC.set({'additionalInfo':options.additionalInfo});
      if (options.employee) dataC.set('employee', {"__type":"Pointer","className":"_User","objectId":options.employee});
      if (options.client) dataC.set('client', {"__type":"Pointer","className":"_User","objectId":options.client});
      if (options.service) dataC.set('service', {"__type":"Pointer","className":"Service","objectId":options.service});
    }
    dataC.save(null, { useMasterKey: true });
    return{ready:true,code:200};
  }, function(error) {
    console.log('Booking update Error',error);
    return {ready:false,error:'Booking update Error '+error, code:500};
  });
};

module.exports = BookingController;
