<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>RANDOMIZER</title>
    <link rel="stylesheet" href="css/randnumb.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div class="container">
    	{% include 'header.tpl' %}
        <main>
            {% if content.categoryTitle == 'Фильм' %}           
                {% include 'block_film.tpl' %}              
            {% elseif content.categoryTitle == 'Цитата' %}                      
                {% include 'block_quote.tpl' %}
            {% elseif content.categoryTitle == 'Поздравление' %}                      
                {% include 'block_congr.tpl' %}                            
            {% elseif content.categoryTitle == 'Число' %}                      
                {% include 'block_number.tpl' %}                            
            {% elseif content.categoryTitle == 'Интересное слово' %}                      
                {% include 'block_word.tpl' %}                            
            {% elseif content.categoryTitle == 'Определение победителя в ВК по лайкам и репостам' %}                      
                {% include 'block_vk.tpl' %}                            
            {% endif %}            
            {% include 'see_now.tpl' %}
        </main>
        {% include 'footer.tpl' %}
        {% include 'film_filter.tpl' %}
        {% include 'quote_filter.tpl' %}
        {% include 'modal_more.tpl' %}
    </div>

    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous" async></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script defer src="js/modal.js"></script>
    <script defer src="https://vk.com/js/api/openapi.js?169" type="text/javascript"></script>
	<script defer src="js/main.js"></script>
    <script defer src="js/film.js"></script>
    <script defer src="js/quote.js"></script>
    <script defer src="js/congratulate.js"></script>
    <script defer src="js/number.js"></script>
    <script defer src="js/words.js"></script>
    <script defer src="js/vk_module.js"></script>
	<script defer src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
</body>
</html>