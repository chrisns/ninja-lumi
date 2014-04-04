var parse = require('parse-color');
data = {'hue': 16139, 'sat': 50, 'bri': 109}

// 
// 100/254
console.log(String(parse('hsl(' + data.hue * (360/65535) + ',' + data.sat * (100/254)+ ',' + data.bri * (100/254) + ')').hex).replace("#", "").toUpperCase());

// console.log(String("56141336AA").replace());
/*
var net = require('net');
var client = new net.Socket();
var jonah = require('jonah');
console.log(jonah.ascii('56141336AA'));

/*

client.connect(5577, '192.168.0.102', function() {
      // console.log('sent ' + hex2a('56141336AA') + ' to ' + '192.168.0.102');
      client.write(hex2a('56141336AA'), 'ascii', function() {
        client.destroy();
      });
    });


/*
var evilscan = require('evilscan');

var options = {
    target:'192.168.0.0/24',
    port:'5577',
    status:'O', // Timeout, Refused, Open, Unreachable
};

var scanner = new evilscan(options);

scanner.on('result',function(data) {
  if (data.status == 'open') {
        var client = new net.Socket();
    client.connect(5577, data.ip, function() {
      console.log('sent ' + hex2a('CC2433') + ' to ' + data.ip);
      client.write(hex2a('CC2433'));
    });
    client.on('data', function(data) {
      console.log('Received: ' + data);
      client.destroy(); // kill client after server's response
    });
    console.log(data);
    }
});


scanner.on('done',function() {

});

scanner.run();




/*var EventEmitter = require('events').EventEmitter;

var opts = {};

var app = new EventEmitter();
app.log = {
    debug: console.log,
    info: console.log,
    warn: console.log,
    error: console.log
};

var driver = new (require('./index'))(opts, app);

driver.on('register', function(device) {
    console.log('Driver.register', device);
    device.on('data', function(value) {
        console.log('Device.emit data', value);
    });
    if (device.D == 1008) { //It's a light
      setInterval(function() {
         device.write({bri:254,sat:254,hue:Math.floor(Math.random()* 65535),on:true,transitionTime:0});
      }, 200);
    }


});

driver.save = function() {
    console.log('Saved opts', opts);
};

setTimeout(function() {
    app.emit('client::up');
}, 500);
*/