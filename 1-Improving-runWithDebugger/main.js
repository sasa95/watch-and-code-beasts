(function () {
    // Works with one argument    
    // function runWithDebugger(myFunction, args) {
    //     debugger;
    //     var parsedArgs = args.join();
    //     myFunction(parsedArgs);
    // }

     function runWithDebugger(myFunction, args) {
        debugger;
       
        myFunction(...args);
    }

    function sayHiTo(name) {
        console.log('hi ' + name);
    }

    function sayFullName(first, last) {
        console.log(first + ' ' + last);
    }

    runWithDebugger(sayFullName, ['gordon', 'zhu']);

    // runWithDebugger(sayFullName, ['gordon', 'zhu']); => 'gordon zhu'


})()