var Blog = function() {

    $(function() {
        $("#datepicker").datepicker({dateFormat: 'yy-mm-dd'});
    });

    this.tinymceinit();
    $('#my-imageupload').imageupload({
      allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
      maxFileSizeKb: 512
    });

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

Blog.prototype.tinymceinit = function() {

    var colors = [
        "000000", "Black",
        "993300", "Burnt orange",
        "333300", "Dark olive",
        "003300", "Dark green",
        "003366", "Dark azure",
        "000080", "Navy Blue",
        "333399", "Indigo",
        "333333", "Very dark gray",
        "800000", "Maroon",
        "FF6600", "Orange",
        "808000", "Olive",
        "008000", "Green",
        "008080", "Teal",
        "0000FF", "Blue",
        "666699", "Grayish blue",
        "808080", "Gray",
        "FF0000", "Red",
        "FF9900", "Amber",
        "99CC00", "Yellow green",
        "339966", "Sea green",
        "33CCCC", "Turquoise",
        "3366FF", "Royal blue",
        "800080", "Purple",
        "999999", "Medium gray",
        "FF00FF", "Magenta",
        "FFCC00", "Gold",
        "FFFF00", "Yellow",
        "00FF00", "Lime",
        "00FFFF", "Aqua",
        "00CCFF", "Sky blue",
        "993366", "Red violet",
        "FFFFFF", "White",
        "FF99CC", "Pink",
        "FFCC99", "Peach",
        "FFFF99", "Light yellow",
        "CCFFCC", "Pale green",
        "CCFFFF", "Pale cyan",
        "99CCFF", "Light sky blue",
        "CC99FF", "Plum"
    ];

    tinymce.init({
        selector: '#p_content',
        plugins: 'image imagetools code textcolor link lists, advlist charmap hr responsivefilemanager',
        height: '480',
        image_dimensions: false,
         image_class_list: [
            {title: 'Responsive', value: 'responsiveimage'}
        ],
        indentation : '20pt',
        toolbar: 'undo redo | formatselect bold italic numlist bullist link blockquote hr alignleft aligncenter alignright alignjustify alignnone fullpage strikethrough underline charmap | fontselect | fontsizeselect | forecolor backcolor | code | indent outdent | responsivefilemanager',
        external_filemanager_path:"./services/utilities/filemanager/",
        filemanager_title:"Responsive Filemanager" ,
        external_plugins: { "filemanager" : "./plugins/responsivefilemanager/plugin.min.js"},
        textcolor_map: colors,
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        font_formats: 'Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
        setup: function (ed) {
          ed.on('init', function (e) {
            ed.execCommand("fontName", false, "Times New Roman");
            this.execCommand("fontSize", false, "12pt");
          });
				},
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        link_assume_external_targets: true,
        // and here's our custom image picker
        file_picker_callback: function(cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = function() {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function() {
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
                    cb(blobInfo.blobUri(), {
                        title: file.name
                    });
                };
                reader.readAsDataURL(file);
            };

            input.click();
        }
    });
};

Blog.prototype.getAll = function() {

    var requestid = 1;
    var formdata = {
        "requestid": requestid
    };

    $.ajax({
        type: "POST",
        url: './services/controllers/blogcontroller.php',
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

                html += "<tr>";
                html += " <td>" + index + "</td>";
                html += " <td>";
                html += "   <a>" + element.title + "</a>";
                html += "   <br />";
                html += "   <small>Created on " + element.createdatetime + "</small>";
                html += " </td>";
                html += " <td>";
                html += "   <button type=\"button\" class=\"btn " + activeclass + " btn-xs\">" + active + "</button>";
                html += " </td>";
                html += " <td id=\"actions\">";
                html += "   <a href=\"#\" onclick=\"blogs.edit(" + element.blogpostid + ")\" class=\"btn btn-info btn-xs\"><i class=\"fa fa-pencil\"></i> Edit </a>";
				html += "   <a href=\"#\" style=\" background-color: #8064A2 !important; border: solid 1px #8064A2 !important; \" data-toggle=\"modal\" data-target=\"#imageModal\"  onclick=\"blogs.setImage("+element.blogpostid+");\" class=\"btn btn-info btn-xs\"><i class=\"fa fa-file-image-o\"></i> Image</a>";
                if (element.isactive == 1) {
                    html += "   <a href=\"#\" onclick=\"blogs.remove(" + element.blogpostid + ")\" class=\"btn btn-danger btn-xs\"><i class=\"fa fa-trash-o\"></i> Unpublish </a>";
                } else {
                    html += "   <a href=\"#\" onclick=\"blogs.add(" + element.blogpostid + ")\" class=\"btn btn-primary btn-xs\"><i class=\"fa fa-plus\"></i> Publish </a>";
                }

                html += " </td>";
                html += "</td>";
            });

            // stathtml += "<tr>";
            // stathtml += "<td style=\"width: 60%; font-weight:bold;\">Number of Blog Posts: </td>";
            // stathtml += "<td style=\"width: 40%; \">" + resp.length + "</td>";
            // stathtml += "</tr>";
            // stathtml += "<tr>";
            // stathtml += "<td style=\"width: 60%; font-weight:bold;\">Number of Active Blog Posts: </td>";
            // stathtml += "<td style=\"width: 40%; \">" + count + "</td>";
            // stathtml += "</tr>";

            // $('#substats').html(stathtml);

            var table = "<table  class=\"table table-striped projects\"  id=\"datatable\" class=\"display nowrap\" data-order='[[ 1, \"asc\" ]]' data-page-length='10'>";
            table += "<thead style=\"overflow-x: hidden !important;\">";
            table += "<tr>";
            table += "<th style=\"width: 1%\">ID#</th>";
            table += "<th style=\"width: 60%\">Post Name</th>";
            table += "<th>Status</th>";
            table += "<th style=\"width: 60%\">Actions</th>";
            table += "</tr>";
            table += "</thead>";
            table += html;
            table += "</div>";
            table += "</tbody>";
            table += "</table>";
            $('#userlist').html(table);

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

Blog.prototype.savefile = function() {
    var error = new Array();
    var title = $('#p_title').val();
    var subtitle = $('#p_subtitle').val();
    var datepicker = $('#datepicker').val();
    var author = $('#p_author').val();
    var image = $('#p_image').val();
    var type = "DIVN";
    var html = tinyMCE.activeEditor.getContent();
    var editcontrol = $('#editcontrol').val();
    var requestid = 2;
    var tags = $("#p_tags").val();

    if(!title){
      error.push("Title is empty.");
    }
    if(!subtitle){
      error.push("Subtitle is empty.");
    }
    if(!datepicker){
      error.push("Blog Date is empty.");
    }
    if(!author){
      error.push("Author is empty.");
    }

    if(!html){
      error.push("Content is empty.");
    }

    if(error.length == 0){
      var formData = new FormData($('form')[0]);
      formData.append('requestid', requestid);
      formData.append('type', type);
      formData.append('content', html);
      formData.append('p_tags', tags);

      $.ajax({
          type: "POST",
          url: './services/controllers/blogcontroller.php',
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
                  } , false);
              }
              return myXhr;
          },
          success: function(response) {

            var jsonobject = JSON.parse(response);
            console.log(response);
              nativeToast({
                  message: jsonobject.message,
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

    }else{
        var errorhtml ="";
        error.forEach(function(element, index){
          errorhtml+= "<br>"+element;

        });
        nativeToast({
            message: errorhtml,
            position: 'bottom',
            timeout: 0,
            type: 'error',
            closeOnClick: true,
            square: true

      });


    }




};

Blog.prototype.save = function() {

    var title = $('#p_title').val();
    var subtitle = $('#p_subtitle').val();
    $("#datepicker").datepicker({dateFormat: 'yy-mm-dd'});
    var datepicker = $('#datepicker').val();
    var author = $('#p_author').val();
    var image = $('#p_image').val();
    var html = tinyMCE.activeEditor.getContent();
    var editcontrol = $('#editcontrol').val();
    console.log(image);
    var requestid = 2;
    var formdata = {
        "title": title,
        "subtitle": subtitle,
        "datepicker": datepicker,
        "author": author,
        "content": html,
        "type": 'DIVN',
        "requestid": requestid,
        "editcontrol": editcontrol
    };

    $.ajax({
        type: "POST",
        url: './services/controllers/blogcontroller.php',
        data: formdata,
        success: function(response) {
          var jsonobject = JSON.parse(response);
            nativeToast({
                message: jsonobject.message,
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

Blog.prototype.remove = function(blogpostid) {

    var requestid = 4;
    var formdata = {
        "blogpostid": blogpostid,
        "requestid": requestid
    };

    $.ajax({
        type: "POST",
        url: './services/controllers/blogcontroller.php',
        data: formdata,
        success: function(response) {
            location.hash = '#actions';
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

Blog.prototype.add = function(blogpostid) {

    var requestid = 5;
    var formdata = {
        "blogpostid": blogpostid,
        "requestid": requestid
    };

    $.ajax({
        type: "POST",
        url: './services/controllers/blogcontroller.php',
        data: formdata,
        success: function(response) {
          location.hash = '#actions';
          location.reload();
        },
        error: function(error) {

        }
    });
};

Blog.prototype.edit = function(blogpostid) {

    var requestid = 0;
    var formdata = {
        "blogpostid": blogpostid,
        "requestid": requestid
    };
    $.ajax({
        type: "POST",
        url: './services/controllers/blogcontroller.php',
        data: formdata,
        success: function(response) {

            var jsonobject = JSON.parse(response);
            console.log(jsonobject);
            tinymce.get("p_content").getBody().innerHTML = jsonobject.template;
            $("#p_title").val(jsonobject.data[0].title);
            $("#p_subtitle").val(jsonobject.data[0].subtitle);
            $("#datepicker").val(jsonobject.data[0].blogdate);
            // $("#p_type").val(jsonobject.data[0].blogtypecd);

            var tagsarray = jsonobject.data[0].tags.split(',');
            tagsarray.forEach(function(element, index) {
              $('#p_tags').tagsinput('add', element);

            });
            // $("#p_tags").val(jsonobject.data[0].tags);
            var options = {};

            var arg = jsonobject.data[0].author;
            console.log("authid: "+arg);
             $('#p_author > option').each(function(){
               if($(this).val()==arg) $(this).parent('select').val($(this).val())
             });
            //
            // $("#p_author").val(jsonobject.data[0].author);
            $("#imgprev").html('<label for="">Current Image</label><img src="./assets/blogimages/' + jsonobject.data[0].blogimagepath + '" alt="Image preview" class="thumbnail" style="max-width: ' + options.maxWidth + 'px; max-height: ' + options.maxHeight + 'px">');
            $("#editcontrol").val(jsonobject.data[0].blogpostid);
        },
        error: function(error) {
          console.log(error);
        }
    });
};

Blog.prototype.editImage = function() {

    var requestid = 8;
    var editcontrol = $('#imageeditcontrol').val();
    var formData = new FormData($('form[name=imageform]')[0]);
    // var files = $('#p_image').prop('files');
    // formData.append('p_image', files);
    formData.append('requestid', requestid);
    formData.append('blogidcontrol', editcontrol);
    console.log(editcontrol);
    $.ajax({
        type: "POST",
        url: './services/controllers/blogcontroller.php',
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
                } , false);
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

Blog.prototype.setImage = function (id) {
  $('#imageeditcontrol').val(id);

  var requestid = 0; //get 1
  var formdata = {
      "blogpostid": id,
      "requestid": requestid
  };
  $.ajax({
      type: "POST",
      url: './services/controllers/blogcontroller.php',
      data: formdata,
      success: function(response) {
var options = {};
          var jsonobject = JSON.parse(response);
          console.log(jsonobject.data[0].blogimagepath);
          if(jsonobject.data[0].blogimagepath !== null){
            $("#imgprev").html('<label for="">Current Image</label><img src="./assets/blogimages/' + jsonobject.data[0].blogimagepath + '" alt="Image preview" class="thumbnail" style="max-width: ' + options.maxWidth + 'px; max-height: ' + options.maxHeight + 'px">');
          }

      },
      error: function(error) {

      }
  });

};

Blog.prototype.clearImage = function () {
  $('#imgprev').html("");
};


Blog.prototype.getAuthors = function () {


      var requestid = 9;
      var formdata = {
          "requestid": requestid
      };

      $.ajax({
          type: "POST",
          url: './services/controllers/authorcontroller.php',
          data: formdata,
          success: function(response) {
            var jobject = JSON.parse(response);
            console.log(jobject);
            var authorlist = "<option selected disabled>Choose Author</option>";

            jobject.forEach(function(element, index){

              authorlist += "<option value=\""+element.authid+"\">"+element.firstname+ " "+element.lastname+"</option>";

            });

            $("#p_author").html(authorlist);


          },
          error: function(error) {

          }
      });

};

Blog.prototype.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
