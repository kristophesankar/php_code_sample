var Author = function() {

    var $imageupload = $('.imageupload');
    $imageupload.imageupload();

    $('#imageupload-disable').on('click', function() {
        $imageupload.imageupload('disable');
        $(this).blur();
    })

    $('#imageupload-enable').on('click', function() {
        $imageupload.imageupload('enable');
        $(this).blur();
    })

    $('#imageupload-reset').on('click', function() {
        $imageupload.imageupload('reset');
        $(this).blur();
    });

};

Author.prototype.getAll = function() {

    var requestid = 1;
    var formdata = {
        "requestid": requestid
    };

    $.ajax({
        type: "POST",
        url: './services/controllers/authorcontroller.php',
        data: formdata,
        success: function(response) {

            var resp = JSON.parse(response);
            var stathtml = "";
            var html = "";
            var count = 0;

            resp.forEach(function(element, index) {
                var active = "Active";
                activeclass = "btn-success";
                if (element.isactive != 1) {
                    active = "Inactive"
                    activeclass = "btn-warning";
                } else {
                    count++;
                }

                html += "<tr id=\"author_view_id\" value=\"" + element.authid + "\">";
                html += " <td>" + index + "</td>";
                html += " <td>";
                html += "   <a>" + element.firstname + " " + element.lastname + "</a>";
                html += "   <br />";
                html += "   <small>Created on " + element.createdatetime + "</small>";
                html += " </td>";
                html += " <td>";
                html += "   <button type=\"button\" class=\"btn " + activeclass + " btn-xs\">" + active + "</button>";
                html += " </td>";
                html += " <td>";
                html += "   <a href=\"#\" onclick=\"authors.edit(" + element.authid + ")\" class=\"btn btn-info btn-xs\"><i class=\"fa fa-pencil\"></i> Edit </a>";
                html += "   <a href=\"#\" style=\" background-color: #8064A2 !important; border: solid 1px #8064A2 !important; \" data-toggle=\"modal\" data-target=\"#imageModal\"  onclick=\"authors.setImage(" + element.authid + ");\" class=\"btn btn-info btn-xs\"><i class=\"fa fa-file-image-o\"></i> Avatar</a>";
                if (element.isactive == 1) {
                    html += "   <a href=\"#\" onclick=\"authors.remove(" + element.authid + ")\" class=\"btn btn-danger btn-xs\"><i class=\"fa fa-trash-o\"></i> Unpublish </a>";
                } else {
                    html += "   <a href=\"#\" onclick=\"authors.add(" + element.authid + ")\" class=\"btn btn-primary btn-xs\"><i class=\"fa fa-plus\"></i> Publish </a>";
                }

                html += " </td>";
                html += "</td>";


            });

            var table = "<table  class=\"table table-striped projects\"  id=\"datatable\" class=\"display nowrap\" data-order='[[ 1, \"asc\" ]]' data-page-length='10'>";
            table += "<thead style=\"overflow-x: hidden !important;\">";
            table += "<tr>";
            table += "<th style=\"width: 1%\">ID#</th>";
            table += "<th style=\"width: 40%\">Author Name</th>";
            table += "<th>Status</th>";
            table += "<th style=\"width: 80%\">Actions</th>";
            table += "</tr>";
            table += "</thead>";
            table += html;
            table += "</div>";
            table += "</tbody>";
            table += "</table>";
            $('#authorlist').html(table);

            $(document).ready(function() {
                var table = $('#datatable').dataTable({
                    scrollX: 300,
                    scrollX: false
                });
            });
        },
        error: function(error) {
            console.log(error);
        }
    });

};

Author.prototype.save = function() {
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();
    var authorsocial = $('#authorsocial').val();
    var bio = $('#bio').val();
    var editcontrol = $('#editcontrol').val();
    var requestid = 2;

    var formdata = {
        "fname": fname,
        "lname": lname,
        "email": email,
        "authorsocial": authorsocial,
        "bio": bio,
        "requestid": requestid,
        "editcontrol": editcontrol
    };
    if (this.validateEmail(email)) {

        $.ajax({
            type: "POST",
            url: './services/controllers/authorcontroller.php',
            data: formdata,
            success: function(response) {
                console.log(response);
                var resp = JSON.parse(response);
                console.log(resp.message);

                nativeToast({
                    message: resp.message,
                    position: 'bottom',
                    timeout: 3000,
                    type: 'success'
                });

                setTimeout(function() {
                    location.reload();
                }, 3000);
            },
            error: function(error) {
                console.log(error);
            }
        });
    } else {
        nativeToast({
            message: "Check your email.",
            position: 'bottom',
            timeout: 3000,
            type: 'error'
        });
    }
};

Author.prototype.resetForm = function() {
    $('#author_form').trigger("reset");
    $('#authorsocial').tagsinput('removeAll');
};

Author.prototype.remove = function(authid) {

    var requestid = 4;
    var formdata = {
        "authid": authid,
        "requestid": requestid
    };

    $.ajax({
        type: "POST",
        url: './services/controllers/authorcontroller.php',
        data: formdata,
        success: function(response) {
            location.reload();

        },
        error: function(error) {
            console.log(error);
            nativeToast({
                message: "Failed.",
                position: 'bottom',
                timeout: 3000,
                type: 'success'
            });
        }
    });
};

Author.prototype.add = function(authid) {

    var requestid = 5;
    var formdata = {
        "authid": authid,
        "requestid": requestid
    };

    $.ajax({
        type: "POST",
        url: './services/controllers/authorcontroller.php',
        data: formdata,
        success: function(response) {
            location.reload();
        },
        error: function(error) {
          console.log(error);
        }
    });
};

Author.prototype.edit = function(authid) {

    var requestid = 0;
    var formdata = {
        "authid": authid,
        "requestid": requestid
    };
    $.ajax({
        type: "POST",
        url: './services/controllers/authorcontroller.php',
        data: formdata,
        success: function(response) {
            console.log(response);
            var jsonobject = JSON.parse(response);

            $("#fname").val(jsonobject[0].firstname);
            $("#lname").val(jsonobject[0].lastname);
            $("#email").val(jsonobject[0].email);
            $("#bio").val(jsonobject[0].bio);
            $("#editcontrol").val(jsonobject[0].authid);
            var socialarray = jsonobject[0].social.split(",");
            socialarray.forEach(function(element, index) {
                $('#authorsocial').tagsinput('add', element);
            });
        },
        error: function(error) {
          console.log(error);
        }
    });
};

Author.prototype.editImage = function() {

    var requestid = 8;
    var editcontrol = $('#imageeditcontrol').val();
    var formData = new FormData($('form[name=imageform]')[0]);
    // var files = $('#p_image').prop('files');
    // formData.append('p_image', files);
    formData.append('requestid', requestid);
    formData.append('authidcontrol', editcontrol);
    console.log(editcontrol);
    $.ajax({
        type: "POST",
        url: './services/controllers/authorcontroller.php',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                // For handling the progress of the upload
                myXhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        $('progress').attr({
                            value: e.loaded,
                            max: e.total,
                        });
                    }
                }, false);
            }
            return myXhr;
        },
        success: function(response) {
            console.log(response);
            var jsonobject = JSON.parse(response);

            nativeToast({
                message: "Image Saved",
                position: 'bottom',
                timeout: 3000,
                type: 'success'
            });

            setTimeout(function() {
                location.reload();
            }, 3000);
        },
        error: function(error) {
            console.log(error);
        }
    });
};

Author.prototype.setImage = function(authid) {
    $('#imageeditcontrol').val(authid);

    var requestid = 0; //get 1
    var formdata = {
        "authid": authid,
        "requestid": requestid
    };
    $.ajax({
        type: "POST",
        url: './services/controllers/authorcontroller.php',
        data: formdata,
        success: function(response) {
            // console.log(response);
            var jsonobject = JSON.parse(response);
            if (jsonobject[0].avatar !== null) {
                $("#imgprev").html('Current Image <br/><img style=\"height:250px;width:250px;margin-bottom:10px;\" src="./assets/authorimages/' + jsonobject[0].avatar + '" />');
            }

        },
        error: function(error) {
          console.log(error);
        }
    });

};

Author.prototype.clearImage = function() {
    $('#imgprev').html("");
};

Author.prototype.getSocial = function(authid) {
    var requestid = 7; //get 1
    var formdata = {
        "authid": authid,
        "requestid": requestid
    };
    console.log();
    $.ajax({
        type: "POST",
        url: './services/controllers/authorcontroller.php',
        data: formdata,
        success: function(response) {

            var jsonobject = JSON.parse(response);
            console.log(jsonobject);
            jsonobject.forEach(function(element, index) {
                $('#authorsocial').tagsinput('add', element.socialdetails);
            });

        },
        error: function(error) {
          console.log(error);
        }
    });
};

Author.prototype.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
