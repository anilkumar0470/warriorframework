var appstore = {

    config_loaded: false,

    uninstallAnApp: function(){
        var $elem = $(this);
        var app_path = $elem.attr('app_path');
        var app_type = $elem.attr('app_type');
        $.ajax({
            headers: {
                'X-CSRFToken': appstore.getCookie('csrftoken')
            },
            type: 'POST',
            url: 'appstore/uninstall_an_app/',
            data: {"app_path": app_path, "app_type": app_type},
        }).done(function(data) {
            setTimeout(function(){location.reload();}, 1500);
		});
    },

    installAnApp: function(){

        if(!config_loaded){
            r = confirm("Do you want to save this configuration?")
            if(r){
                var filename = prompt("Please enter a name for the configuration.");
                if ( filename == null ||  filename == ""){
                    alert("Configuration not saved.")
                }
                else {
                    var $elements = $("#new-app-info :input");
                    var app_paths = []
                    var path = "";
                    for(var i=0 ; i<$elements.length; i++){
                        path = $elements[i].value.trim();
                        if(path == ""){
                            alert("Field cannot be empty");
                        }
                        else {
                            app_paths.push(path)
                        }
                    }

                    $.ajax({
                        headers: {
                            'X-CSRFToken': appstore.getCookie('csrftoken')
                        },
                        type: 'POST',
                        url: 'appstore/create_config/',
                        data: {"app_paths": app_paths, "filename":  filename},
                    }).done(function(data) {
                        setTimeout(function(){location.reload();}, 1500);
                    });
                    alert("Configuration Saved: " +  filename)
                }
            }
        }
        else {

            var $elements = $("#new-app-info :input");
            var app_paths = []
            var path = "";
            for(var i=0 ; i<$elements.length; i++){
                path = $elements[i].value.trim();
                if(path == ""){
                    alert("Field cannot be empty");
                }
                else {
                    app_paths.push(path)
                }
            }

            $.ajax({
                headers: {
                    'X-CSRFToken': appstore.getCookie('csrftoken')
                },
                type: 'POST',
                url: 'appstore/install_an_app/',
                data: {"app_paths": app_paths},
            }).done(function(data) {
                setTimeout(function(){location.reload();}, 1500);
            });
        }

        /**

        $.ajax({
            headers: {
                'X-CSRFToken': appstore.getCookie('csrftoken')
            },
            type: 'POST',
            url: 'appstore/create_config/',
            data: {"app_paths": app_paths},
        }).done(function(data) {
            setTimeout(function(){location.reload();}, 1500);
		});**/
    },

    loadConfig: function(){
        $.ajax({
            type: 'GET',
            url: 'appstore/load_configs/',
        }).done(function(data) {
            config_loaded = true;
            $('#pop-up-file-info').html(data);
		});
    },

    addAnotherApp: function(){
        var $parent = document.getElementById("new-app-info");
        var $elem = $('<input placeholder="Path to the App" value="">');
        $parent.append($elem[0]);
        console.log($parent)
    },

    openConfig: function(){
        var $elem = $(this);
        var $checked = $elem.attr('choice');

        $.ajax({
            type: 'GET',
            url: 'appstore/open_config?config_name=' + $checked,
        }).done(function(data) {
            alert(data)
            $('#new-app-info').html(data);
		});
    },

    storeValue: function(){
        var $elem = $(this);
        var $value = $elem.val()

        var $attach = $("#open_config")
        $attach.attr("choice", $value);
    },

    getCookie: function(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}