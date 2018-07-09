(function() {
    $.ajax({
        url: 'https://api.github.com/users',
        method: 'GET',
        success: function(res) {
            console.log('github res', res);
            ko.applyBindings({
                gUsers: res, // var gUsers = res;
                getUser: function(id) {
                    console.log('guser ==> ', id);

                    var p = new Promise(function(resolve, reject) {
                        $.ajax({
                            url: `https://api.github.com/users/${id}`,
                            method: 'GET',
                            success: (user) => {
                                resolve(user);
                            },
                            error: (err) => {
                                reject(err);
                            }
                        });
                    });

                    p.then((u) => {
                        console.log('user details from promise ==> ', u);
                    })
                    .catch((e) => {
                        console.log('user got error ==> ', e);
                    });
                }
            });
        },
        error: function(err) {
            console.error(err);
        }
    });

})();

$(document).ready(function() {

});

function add (a, b, cb) {
    console.log();
    cb('im coming from callback');
}

add(2, 5, function(c, d) {
    console.log(c);
});

function multiply(a, b) {
    return a * b;
}

// var x = multiply(add(2, 3));