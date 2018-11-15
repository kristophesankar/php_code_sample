<?php

include './services/utilities/adminsecurity.php';
$sessionuser = $_SESSION['user'];

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>CoffeeTable Coven | Blogs</title>

    <!-- Bootstrap -->
    <link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- jQuery custom content scroller -->
    <link href="../vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css" rel="stylesheet"/>

    <!-- Custom Theme Style -->
    <link href="../build/css/custom.min.css" rel="stylesheet">
    <link href="../build/css/styles.css" rel="stylesheet">
    <link href="./js/bootstrap-imageupload/css/bootstrap-imageupload.min.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="../../node_modules/datatables.net-bs4/css/datatables.bootstrap4.min.css"/>
    <script src='../../node_modules/tinymce/tinymce.min.js'></script>
  </head>

  <body class="nav-md">
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col ">
          <div class="left_col scroll-view">

            <!-- sidebar menu -->
            <?php include './fixed_sidebar.php';?>
            <!-- /sidebar menu -->

            <!-- /menu footer buttons -->
            <div class="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
            </div>
            <!-- /menu footer buttons -->
          </div>
        </div>

        <!-- top navigation -->
        <?php include 'top-navigation.php';?>
        <!-- /top navigation -->

        <!-- page content -->
        <div class="right_col" role="main">
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>Blog Posts </h3>
              </div>
            </div>

            <div class="clearfix"></div>

            <div class="row">
              <div class="col-md-12 ">
                <div class="x_panel">
                  <div class="x_title">
                    <h2><i class="fa fa-edit"></i>&nbsp;&nbsp;New/Edit Post</h2>
                    <ul class="nav navbar-right panel_toolbox">
                      <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                      </li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <div class="row">
                        <form enctype="multipart/form-data">
                          <!-- blog post id -->
                          <input type="hidden" id="editcontrol" name="editcontrol" value="">
                          <input type="hidden" id="requestid" name="requestid" value=2>
                          <div class="col-lg-3">
                            <div class="col-lg-12" style="margin-bottom:10px;">
                              <input type="text" class="form-control" id="p_title" name="p_title" placeholder="Title">
                            </div>
                            <div class="col-lg-12" style="margin-bottom:10px;">
                              <textarea id="p_subtitle" name="p_subtitle" style=" resize: vertical;" rows="2" class="form-control" placeholder="Enter subtitle here..."></textarea>
                            </div>

                            <div class="col-lg-12" style="margin-bottom:10px;">
                              <select id="p_author" class="form-control" name="p_author">

                              </select>

                            </div>
                            <div class="col-lg-12" style="margin-bottom:10px;">
                              <input type="text" class="form-control" id="datepicker" name="datepicker" placeholder="Post Date">
                            </div>
                            <div class="col-lg-12" style="margin-bottom:10px;">
                              <input type="text"  class="form-control" id="p_tags"  data-role="tagsinput" placeholder="Add Tags" />
                            </div>
                          </div>
                          <div class="col-lg-9">
                            <div class="col-lg-12" style="margin-bottom:10px;">
                              <textarea id="p_content" name="p_content"></textarea>
                            </div>
                          </div>
                          <div class="col-lg-12">
                              <button type="button" class="btn btn-primary" onclick="blogs.savefile()" name="button">Save</button>
                          </div>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2><i class="fa fa-list"></i>&nbsp;&nbsp;Post List</h2>
                    <ul class="nav navbar-right panel_toolbox">
                      <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                      </li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">

                    <p>The table below lists all blog posts.</p>

                    <!-- start project list -->
                    <div class="col=lg-12" id="userlist">

                    </div>
                    <!-- end project list -->

                  </div>
                </div>
              </div>

            </div>
            <div class="row">

            </div>
          </div>
        </div>

        <form id="imageform" name="imageform" enctype="multipart/form-data">
          <input type="hidden" name="imageeditcontrol" id="imageeditcontrol" value="">
          <div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="imageModalLabel">New/Edit Image</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form enctype="multipart/form-data">

                    <div class="imageupload panel panel-default">
                      <div class="panel-heading clearfix">
                          <h3 class="panel-title pull-left">Upload Image</h3>
                          <div class="btn-group pull-right">
                              <button type="button" class="btn btn-default active">File</button>
                              <!-- <button type="button" class="btn btn-default">URL</button> -->
                          </div>
                      </div>
                      <div class="file-tab panel-body">
                        <div id="imgprev">

                        </div>
                          <label class="btn btn-default btn-file">

                              <span>Browse</span>
                              <!-- The file is stored here. -->
                              <input id='p_image' type="file" name="p_image">
                          </label>
                          <button type="button" class="btn btn-default">Remove</button>
                      </div>
                      <div class="url-tab panel-body">
                          <div class="input-group">
                              <input type="text" class="form-control" placeholder="Image URL">
                              <div class="input-group-btn">
                                  <button type="button" class="btn btn-default">Submit</button>
                              </div>
                          </div>
                          <button type="button" class="btn btn-default">Remove</button>
                          <!-- The URL is stored here. -->
                          <input type="hidden" name="">
                      </div>
                  </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button"  onclick="blogs.clearImage()" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" onclick="blogs.editImage()" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

          </form>
        <!-- /page content -->

        <!-- footer content -->
        <footer>
          <div class="pull-right">
            CoffeeTable Coven Administrator Panel
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
      </div>
    </div>

    <!-- jQuery -->
    <script src="../vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="../vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script src="../vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="../vendors/nprogress/nprogress.js"></script>
    <!-- jQuery custom content scroller -->
    <script src="../vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>

    <!-- Custom Theme Scripts -->
    <script src="../build/js/custom.min.js"></script>
    <script src="./js/services/blog.js"></script>
    <link rel="stylesheet" href="../../node_modules/native-toast/dist/native-toast.css">
    <script src="../../node_modules/native-toast/dist/native-toast.js"></script>
    <script type="text/javascript" src="../../node_modules/datatables.net/js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js"></script>
    <link rel="stylesheet" href="../../js/vendor/jquery-ui/jquery-ui.css">
    <script type="text/javascript" src="../../js/vendor/jquery-ui/jquery-ui.js"></script>
    <script src="./js/bootstrap-imageupload/js/bootstrap-imageupload.min.js"></script>
    <link rel="stylesheet" href="./js/bootstrap-tagsinput-latest/dist/bootstrap-tagsinput.css">
    <script src="./js/bootstrap-tagsinput-latest/dist/bootstrap-tagsinput.js"></script>
    <script type="text/javascript">
      var blogs = new Blog();
      blogs.getAll();
      blogs.getAuthors();
    </script>
  </body>
</html>
