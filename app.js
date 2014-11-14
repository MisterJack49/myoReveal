var Myo = require('myo');

var myo = Myo.create();

var initialized = false;

var RPYInit= []


if(!initialized && RPYInit.length<5){

	console.log("Put your arm at rest position");
	console.log("Do Fist");

	myo.on('fist', function(edge){
		if(edge){				
			var RPY = {
				'roll' : getRoll(myo.lastIMU.orientation),
				'pitch': getPitch(myo.lastIMU.orientation),
				'yaw'  : getYaw(myo.lastIMU.orientation)
			};
			RPYInit.push(RPY);
			console.log(RPYInit);;	
			console.log("Release Fist");
		}
	});
}

myo.lock();

myo.on('lock',function(edge){
	myo.vibrate('short');
})

myo.on('wave_in',function(edge){
	myo.timer(edge, 500, function(){
		myo.vibrate('short').vibrate('short');
		myo.unlock(5000);
	});
});

myo.on('fist', function(edge){
	if(!myo.isLocked){
		myo.timer(edge, 500, function(){
			myo.vibrate('medium');
			process.exit();
		});
	}
});

myo.on('imu', function(data){
	var orientation = data.orientation;
		//console.log("Roll : " + getRoll(orientation) );
		//console.log("Pitch : " + getPitch(orientation) );
	});

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