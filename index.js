var util = require('util');
var stream = require('stream');
var evilscan = require('evilscan');
var net = require('net');
var socket = new net.Socket();
var parse = require('parse-color');

util.inherits(Driver, stream);
util.inherits(Bulb, stream);
module.exports = Driver;

function Driver(opts,app) {

    var self = this;

    this._app = app;
    this._opts = opts;
    this._opts.stations = opts.stations || [];

    var devices = {};

    app.once('client::up', function() {
        console.log('Starting Lumi scanning!');

        var scanner = new evilscan({
            target:'192.168.0.0/24',
            port:'5577',
            status:'O',
        });

        scanner.on('result',function(bulb) {
          if (bulb.status == 'open') {
              var device  = new Bulb(bulb);
              if (!devices[device.G]) {
                devices[device.ip] = new Bulb(device);
                console.log("Registering bulb " + bulb.ip)
                self.emit('register', device);
              }
            }
        });
        scanner.on('start',function() {
            console.log('started lumi scanning!');
        });
        scanner.on('done',function() {
            console.log('Finished lumi scanning!');
        });
        scanner.on('error',function(err) {
            throw new Error(data.toString());
        });
        scanner.run();
    });
};

/**
 * Creates a new Device Object
 *
 * @property {Boolean} readable Whether the device emits data
 * @property {Boolean} writable Whether the data can be actuated
 *
 * @property {Number} G - the channel of this device
 * @property {Number} V - the vendor ID of this device
 * @property {Number} D - the device ID of this device
 *
 * @property {Function} write Called when data is received from the cloud
 *
 * @fires data - Emit this when you wish to send data to the cloud
 */
function Bulb(bulb) {
  var self = this;

  this.bulb = bulb;

  this.writeable = true;
  this.readable = false;
  this.V = 0;
  this.D = 1008;
  this.G = 'lumiled' + String(bulb.ip).replace(/\./g, "");
  this.name = 'Lumi Led - ' + (bulb.name||bulb.ip);
}

Bulb.prototype.write = function(data) {
  if (typeof data === 'string') {
      data = JSON.parse(data);
  }
  if (data.on == true) {
      // sendHex('CC2333', this.bulb.ip)
  }
  if (data.on == false) {
      // sendHex('CC2433', this.bulb.ip)
  }
  var color = parse('hsl(' + data.hue * (360/65535) + ',' + data.sat * (100/254)+ ',' + data.bri * (100/254) + ')');
  console.log(color);
  var hex = String(color.hex).replace("#", "").toUpperCase();
  sendHex('56' + hex + 'AA', this.bulb.ip);
  console.log('Writing to lifx', data);
}

function sendHex(hex, ip) {
      console.log("send " + hex + " to " + ip);
      socket.connect(5577, ip, function() {
      socket.write(hex2a(hex), 'ascii', function() {
        socket.destroy();
      });
    });
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}