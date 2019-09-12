$(document).ready(() => {
    $("#loginBtn").click(() => {
        window.location.href = '/users/login';
    });

    $("#registerBtn").click(() => {
        window.location.href = '/users/register';
    });

    $("#homeBtn").click(() => {
        window.location.href = '/';
    });

    $("#leaguesBtn").click(function() {
        $.getJSON("/leagues/data", () => {})
            .done(function(data) {
                $(data).each(function(index, league) {
                    $('#leaguesList').append(
                        $('<li />').text(league.Name)
                    )
                });
                $("#leaguesBtn").hide();
            })
            .fail(function() {
                console.log("error");
            });
    });

    $('#form-login').on('submit', (e) => {
        e.preventDefault();

        let data = {
            "email": $('#inputEmail').val(),
            "password": $('#inputPassword').val()
        };
        console.log(data);

        $.post("http://localhost:3000/users/login", data, function() {})
            .done(function(res) {
                $('#msg').removeClass('alert-danger');
                $('#msg').addClass('alert-success');
                $('#msg').html('Success!');

                $('#inputEmail').val('');
                $('#inputEmail').attr("disabled", true);
                $('#inputPassword').val('');
                $('#inputPassword').attr("disabled", true);

                $('#submitBtn').hide();
                $('#logoutBtn').show();
                $('#logoutBtn').focus();
            })
            .fail(function(e) {
                if (e.status === 401) {
                    $('#msg').html('Account locked!');
                } else if (e.status === 403) {
                    $('#msg').html('Invalid Creds!');
                } else {
                    $('#msg').html(`Error: ${e.status}`);
                }

                $('#msg').removeClass('alert-success');
                $('#msg').addClass('alert-danger');
                $('#inputEmail').focus();
            });
        $('#msg').show();
    });
});