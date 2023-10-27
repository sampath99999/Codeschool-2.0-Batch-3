myApp.service(
    'ValidationService', function() {
        this.isValidName = function (name) {
           
            return /^[A-Za-z\s]*$/.test(name);
        };

        this.isValidNumber = function (number) {
           
            return /^[0-9]+$/.test(number);
        };
        
       
        
    }

        
);