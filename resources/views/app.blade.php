<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>WH App</title>
</head>

<body>
{{--    place js here--}}
</body>
<script>
    window.env = {
        API_BASE_URL: '{{ env ("API_BASE_URL") }}'
    }
</script>
</html>
