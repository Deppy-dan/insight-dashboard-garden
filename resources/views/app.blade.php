
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Música Igreja - Sistema de Gestão Musical</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Vite Assets -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="antialiased">
    <div id="root"></div>
    <script>
        // Add CSRF token to Ajax request headers
        window.csrfToken = "{{ csrf_token() }}";
        console.log('Blade template carregado');
    </script>
    <!-- GPT Engineer script precisa vir antes dos outros scripts -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
</body>
</html>
