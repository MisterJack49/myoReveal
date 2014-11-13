var Myo = require('myo');

var myo = Myo.create();

myo.lock();

myo.on('lock',function(edge){
	myo.vibrate('short');
})

myo.on('thumb_to_pinky',function(edge){
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

myo.on('fingers_spread', function(edge){
	var done = false;
	if (!myo.isLocked && !done) {
		done=true;
		myo.on('orientation', function(data){
			
			
			var yaw = Math.atan2(2.0 * (data.w * data.z + data.x * data.y), 1.0 - 2.0 * (data.y * data.y + data.z * data.z));

			
			
			var yaw_w = ((yaw + Math.PI/2.0)/Math.PI * 18);

			//console.log('Roll : ' + roll_w);
			//console.log('Pitch : ' + pitch_w);
			//console.log('Yaw : ' + yaw_w);
			//console.log(myo.lastIMU.orientation);
			console.log(getRoll(myo.lastIMU.orientation));
		});
	};
});

myo.on('imu', function(data){
	var orientation = data.orientation;
		if(getRoll(orientation) > 3.5 && getPitch(orientation) >5){
			console.log("flap up");
		}
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

