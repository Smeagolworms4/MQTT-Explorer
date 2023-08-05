(<any>window).requestIdleCallback =
    (<any>window).requestIdleCallback ||
    function(cb: any) {
        var start: any = Date.now();
        return setTimeout(function() {
            cb({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, 50 - (Date.now() - start));
                },
            });
        }, 1);
    }
;

(<any>window).cancelIdleCallback =
    (<any>window).cancelIdleCallback ||
    function(id: any) {
        clearTimeout(id);
    }
;