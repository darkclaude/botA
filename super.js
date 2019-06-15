var parser = require('fast-xml-parser');
var he = require('he');
var rest = require('restler');
var nodemailer = require('nodemailer')
var line_main ="";
var options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//def
    tagValueProcessor : a => he.decode(a) //default is a=>a
};
blast();

var blaster = setInterval(function(){
blast();

},1000* 60 *1);
 
setInterval(function(){

mail();
line_main="";
},1000*60*30);

function blast(){


    var jsonData = {price: 2, network: "tigo", recipient_number:"0571137221", sender:"0571137221", option: "rttt", "orderID": "", apikey:"7784ad10afe48c59ec6ef9ce83a32ed8a08e7f6c" };
rest.postJson('https://client.teamcyst.com/api_call.php', jsonData).on('complete', function(data, response) {
  //  console.log(data)
    if( parser.validate(data) === true) { //optional (it'll return an object in case it's not valid)
    var jsonObj = parser.parse(data,options);
    var newobj = jsonObj['soapenv:Envelope']['SOAP-ENV:Body']['v11:PurchaseInitiateResponse'];
    var fs = require('fs');
    console.log(newobj);
   newobj['time'] = new Date().toString();
   var line = JSON.stringify(newobj)+'\n';
  var l = "";
  var t = [];
 var o = newobj;
   l = "TIME: "+o.time+" Status: "+o["v31:ResponseHeader"]["v31:GeneralResponse"]["v31:status"]+" Description: "+o["v31:ResponseHeader"]["v31:GeneralResponse"]["v31:description"]+" : "+o["v11:responseBody"]["v11:paymentId"]+":"+o["v11:responseBody"]["v11:paymentReference"]+"\n";
 
   line_main+=l+"\n\n\n";
 //  console.log(l);
   console.log(line_main);
  
fs.appendFile('mynewfile1.txt', line, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
}

});
}


function mail(){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'instantpins@gmail.com', //email address to send from
          pass: 'ninjaxkid12' //the actual
        }
      })
    
      var mailOptions = {
        from: 'InstantPins <instantpins@gmail.com>',
        to: 'instantpins@gmail.com',
        subject: 'Updates',
        text: line_main 
      
      }
      
      transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log('Error');
        } else {
            console.log('Email Sent');
        }
        console.log(err);
        console.log(res);
      })
      
}