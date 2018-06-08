<!DOCTYPE HTML>
<html lang="vi">
<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<head>
    @include('partial/frontend/meta')

    @include('partial/frontend/css')

    @include('partial/frontend/js')
</head>

<body id="{{ isset($id_body) ? $id_body : '' }}">
<!--POPUP-->
<!--POPUP-->
<div id="register-loader"></div>
<div id="contact-loader"></div>
<!--LOAD-PAGE-->
<div class="all-pics"></div>
<div class="all-album"></div>
<div class="allvideo"></div>
<div class="overlay-album"></div>
<div class="overlay-video"></div>
<div class="overlay-dark"></div>
<!--LOAD-PAGE-->
<!--TOP-->
@include('partial/frontend/sidebar')
<!--TOP-->
<!--CONTAINER-->
<div class="container">
    @yield('content')
    @include('partial/frontend/right_bottom')
</div>
<!--CONTAINER-->
@include('partial/frontend/footer')
</body>
</html>