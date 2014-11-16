var Myo = require('myo');

var myo = Myo.create();

var firstOrientationAngles;

myo.on('orientation', function(data){
	getFirstOrientation();
	var orientationAngles ={
		roll : getRoll(myo.lastIMU.orientation),
		pitch : getPitch(myo.lastIMU.orientation),
		yaw : getYaw(myo.lastIMU.orientation)
	};
	console.log(firstOrientation);
});

function getFirstOrientation(){
	firstOrientationAngles ={
		roll : getRoll(myo.lastIMU.orientation),
		pitch : getPitch(myo.lastIMU.orientation),
		yaw : getYaw(myo.lastIMU.orientation)
	};
	for (var i = 0; i < 100; i++) {
		firstOrientationAngles.roll  += getRoll(myo.lastIMU.orientation);
		firstOrientationAngles.pitch += getPitch(myo.lastIMU.orientation);
		firstOrientationAngles.yaw   += getYaw(myo.lastIMU.orientation); 
	};

	firstOrientationAngles.roll /= 100;
	firstOrientationAngles.pitch /= 100;
	firstOrientationAngles.yaw /= 100;

	getFirstOrientation = noop;
}

function noop(){}

function getRoll(data){
	var roll = Math.atan2(2.0 * (data.w * data.x + data.y * data.z), 1.0 - 2.0 * (data.x * data.x + data.y * data.y));
	var roll_w = ((roll + Math.PI)/(Math.PI * 2.0) * 18);
	return roll_w;
}

function getPitch(data){
	var pitch = Math.asin(Math.max(-1.0, Math.min(1.0, 2.0 * (data.w * data.y - data.z * data.x))));
	var pitch_w = ((pitch + Math.PI/2.0)/Math.PI * 18);
	return pitch_w;
}

function getYaw(data){
	var yaw = Math.atan2(2.0 * (data.w * data.z + data.x * data.y), 1.0 - 2.0 * (data.y * data.y + data.z * data.z));
	var yaw_w = ((yaw + Math.PI/2.0)/Math.PI * 18);
	return yaw_w;
}


/*
		   / z
		  / yaw
         /
________/
x roll  \
	     \
	   	  \
	   	   \ y pitch

	   	   */