var Blog = function () { }

Blog.prototype.truncateText = function (text, maxLength) {
  var truncated = text
  if (text != null) {
    if (truncated.length > maxLength) {
      truncated = truncated.substr(0, maxLength) + '...'
    }
  }

  return truncated
}

Blog.prototype.base64 = function () {
  var Base64 = { _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', encode: function (e) { var t = ''; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 }t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ''; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ''); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } }t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, 'n'); var t = ''; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ''; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

  return Base64
}

Blog.prototype.populateAllBlogs = function () {
  var requestid = 1
  var formdata = {
    requestid: requestid
  }

  $.ajax({
    type: 'POST',
    url: './services/controllers/blogcontroller.php',
    data: formdata,
    success: function (response) {
      var resp = JSON.parse(response)
      console.log(resp)
      var stathtml = ''
      var html = ''
      var count = 0
      resp.reverse()
      resp.forEach(function (element, index) {

        var temparr = element.text.split('blog')
        var splitarr = temparr[1].split('.txt')

        if (count > 5) {
          html += '<div id="' + element.blogpostid + '" class="col-lg-6 loadmore" >'
        } else {
          html += '<div id="' + element.blogpostid + '" class="col-lg-6" >'
        }
        var blogs = this.blogs
        var title = blogs.truncateText(element.title, 55)
        var subtitle = blogs.truncateText(element.subtitle, 100)
        var datearray = element.blogdate.split(' ')

        html += '<div class="row" style="background: #eee; padding: 0px 0px  0px 0px;  margin: 5px; margin-bottom:35px !important; border: solid 2px #eee;">'
        html += '<div class="col-lg-6" style="padding: 0px !important;">'
        // html += "<img class=\"img-responsive col-lg-12 imglogo latest\" style=\"padding: 0px !important;\" src=\"./images/home-slider/2.jpg\" alt=\"\">";
        html += '<img class="img-responsive col-lg-12 imglogo latest" style="padding: 0px !important;" src="./proto/admin/proto/assets/blogimages/' + element.blogimagepath + '" alt="">'
        html += '</div>'
        html += '<div class="col-lg-6" style="padding: 1em !important;">'
        html += '<header>'
        html += '<h5 class="cards-text" style="height:90px;"  title="' + element.title + '">' + title + '</h5>'
        html += '</header>'
        html += '<p class="cards-text" style="margin-top:30px; height:50px; font-size: 16px;">' + subtitle + '</p><br><br>'
        html += '<a href="./post.php?p=' + splitarr[0] + '&q=' + blogs.base64().encode(element.blogpostid) + '#nav" class="btn btn-info center-block btn-sm">Read Article</a>'
        html += '<hr>'
        html += '<p class="cards-text" style="font-size:16px;">Created on <b>' + datearray[0] + '</b></p>'
        html += '</div>'
        html += '</div>'
        html += '</div>'
        count++
      })

      $('#blog_content').html(html)
    },
    error: function (error) {
      console.log(error)
    }
  })
}

Blog.prototype.getAll = function () {
  var requestid = 1
  var formdata = {
    requestid: requestid
  }

  $.ajax({
    type: 'POST',
    url: './services/controllers/blogcontroller.php',
    data: formdata,
    success: function (response) {
      var resp = JSON.parse(response)
      console.log(resp)
      var stathtml = ''
      var html = ''
      var count = 0
      resp.reverse()
      resp.forEach(function (element, index) {

        var temparr = element.text.split('blog')
        var splitarr = temparr[1].split('.txt')

        if (count > 1) {
          html += '<div id="' + element.blogpostid + '" class="col-lg-6 loadmore" >'
        } else {
          html += '<div id="' + element.blogpostid + '" class="col-lg-6" >'
        }
        var blogs = this.blogs
        var title = blogs.truncateText(element.title, 55)
        var subtitle = blogs.truncateText(element.subtitle, 100)
        var datearray = element.blogdate.split(' ')

        html += '<div class="row" style="background: #eee; padding: 0px 0px  0px 0px;  margin: 5px; margin-bottom:35px !important; border: solid 2px #eee;">'
        html += '<div class="col-lg-6" style="padding: 0px !important;">'
        html += '<img class="img-responsive col-lg-12 imglogo latest" style="padding: 0px !important;" src="./proto/admin/proto/assets/blogimages/' + element.blogimagepath + '" alt="">'
        html += '</div>'
        html += '<div class="col-lg-6" style="padding: 1em !important;">'
        html += '<header>'
        html += '<h5 class="cards-text" style="height:90px;"  title="' + element.title + '">' + title + '</h5>'
        html += '</header>'
        html += '<p class="cards-text" style="margin-top:30px; height:50px; font-size: 16px;">' + subtitle + '</p><br><br>'
        html += '<a href="./post.php?p=' + splitarr[0] + '&q=' + blogs.base64().encode(element.blogpostid) + '#nav" class="btn btn-info center-block btn-sm">Read Article</a>'
        html += '<hr>'
        html += '<p class="cards-text" style="font-size:16px;">Created on <b>' + datearray[0] + '</b></p>'
        html += '</div>'
        html += '</div>'
        html += '</div>'
        count++
      })

      // var intro = "<div class=\"head-description\" style=\"text-align:center;\"><p class=\"col-lg-12 hidden-lg-down text-center\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis, sapien nec ornare interdum, quam ante posuere eros, sed fringilla est risus vel diam. Duis nec libero enim.</p></div>";
      $('#blog_content').html(html)
    },
    error: function (error) {
      console.log(error)
    }
  })
}

Blog.prototype.getLatestBlog = function () {
  // var blogpostid = $('#blog_content div:nth-child(2)').attr('id');

  var requestid = 7
  var formdata = {
    requestid: requestid,
    latestrequest: 1
  }
  $.ajax({
    type: 'POST',
    url: './services/controllers/blogcontroller.php',
    data: formdata,
    success: function (response) {
      console.log(response)
      var jobject = JSON.parse(response)
      var blogpostid = jobject.data[0].blogpostid
      var jsonobject = JSON.parse(response)
      var postfilename = jobject.data[0].text
      var postfilenamearray = postfilename.split('blog')
      var namearray = postfilenamearray[1].split('.txt')
      $('#nav-latest').attr('href', './post.php?p=' + namearray[0] + '&q=' + blogs.base64().encode(blogpostid) + '"#nav')
    },
    error: function (error) {
      console.log(error)
    }
  })
}

Blog.prototype.validateEmail = function (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
