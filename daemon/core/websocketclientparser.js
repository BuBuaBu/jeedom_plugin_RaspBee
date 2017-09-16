const util = require('util');
websocketclientparser = module.exports = {


	process : function (jsondata) {
		console.log("--------------------------------");
		console.log("beginprocess",jsondata);
		console.log("--------------------------------");
		//console.log("websocketclientparser process:");
		// on traite le type (r)
		switch (jsondata.r){
		case 'sensors':
			return(this.sensorsprocess(jsondata));
			break;
		case 'lights':
			return(this.lightsprocess(jsondata));
			break;
		default :
			//console.log("raw: ",jsondata);
		return jsondata;
		}
					
	},
	
	sensorsprocess : function (sensorsobj){
		console.log("--------------------------------");
		console.log("websocketclientparser sensorsprocess:");
		console.log ("raw sensor object:", sensorsobj);
		console.log("--------------------------------");
		var call = new Object();
		// on traite les events (t)
		switch (sensorsobj.t){
		case 'event':
			// si on a une valeur state pour le sensor (bouton)
			if (typeof sensorsobj.state !== 'undefined') {
				call.type = sensorsobj.r;
				call.id = sensorsobj.id;
				call.action = sensorsobj.state;
				return call;
			}else
			// si on a une valeur config pour le sensor (battery)
			if (typeof sensorsobj.config !== 'undefined') {
				call.type = sensorsobj.r;
				call.id = sensorsobj.id;
				call.info = sensorsobj.config;
				return call;
			}else
			{
				//console.log("event inconnu: ",sensorsobj);
				return "event inconnu: "+sensorsobj;
			}
			break;
			default :
			//console.log("raw: ",sensorsobj);
			return "raw: "+sensorsobj;
			
		}
	},
	
	lightsprocess : function (lightobj){
		console.log("websocketclientparserlightsprocess:");
		console.log("raw lightobject: ",lightobj);
		//console.log("websocketclientparser sensorsprocess:");
		var call = new Object();
		// on traite les events (t)
		switch (lightobj.t){
		case 'event':
			// si on a une valeur state pour le light
			if (typeof lightobj.state !== 'undefined') {
				call.type = lightobj.r;
				call.id = lightobj.id;
				call.action = lightobj.state;
				return call;
			}else
			{
				//console.log("event inconnu: ",lightobj);
				return "event inconnu: "+JSON.stringify(lightobj);
			}
			break;
			default :
			//console.log("raw: ",lightobj);
			return "raw: "+lightobj;			
		}
	}
}