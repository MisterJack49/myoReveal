(function(){
	var Myo = require('myo');

	var myo = Myo.create();

	myo.lock();

	myo.on('lock',function(edge){
		myo.vibrate('short');
	});

	myo.on('thumb_to_pinky',function(edge){
		myo.timer(edge, 500, function(){
			myo.vibrate('short').vibrate('short');
			myo.unlock(5000);
		});
	});

	myo.on('wave_out',function(edge){
		if(!myo.isLocked && edge){
			Reveal.right();
			myo.unlock(2000);<
		}
	});

	myo.on('wave_in',function(edge){
		if(!myo.isLocked && edge){
			Reveal.left();
			myo.unlock(2000);
		}
	});
})();