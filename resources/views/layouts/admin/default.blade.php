<!DOCTYPE html>
<html lang="en">
<head>
    @include('partial/admin/meta')
    @include('partial/admin/css')
    @include('partial/admin/js')
    <script>
        var baseUrl = "<?php echo url('admin');?>";
    </script>
</head>

<body class="theme-red">
    @include('partial/admin/header')
    @include('partial/admin/sidebar')
    @yield('content')
    @include('partial/admin/footer')
</body>
</html>