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