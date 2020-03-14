{% set secondClass = '' %} 
{% if content.categoryTitle == 'Определение победителя в ВК по лайкам и репостам' %}           
    {% set secondClass = 'vk-other_cat' %}            
{% endif %}  
<div class="other-cat {{ secondClass }}">
    Кроме {{ content.categoryCase }} наш генератор выдаёт варианты из
    <a class="link-in-text">других категорий</a>,
    например, &laquo;<a class="link-in-text" onclick="{{ content.otherCatParams.function }}">{{ content.otherCategory }}</a>&raquo;
</div>