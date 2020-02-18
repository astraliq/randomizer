<div class="see-now-main-data">
    <div class="see-now-cat"><a class="see-now-cat-link" onclick="congratulate.runProgr()">Поздравление</a></div>
    <div class="data-desc">
        <div class="see-now-text">
            <p class="cong-cat">Тема: 
            	<a href="#" class="cong-cat-link">{{ content.browseNowData.congrData.theme }}</a>.
            	<br>
            	<a href="#" class="cong-cat-link">{{ content.browseNowData.congrData.who }}</a>
            </p>
            <p class="congr-text" id="congr_text">{{ content.browseNowData.congrData.congratulate }}</p>
            <label for="button-cg" onclick="changeStatus('congr', 'congr_text')" id="congr">Больше описания</label>
            <input type="checkbox" id="button-cg">
        </div>
    </div>
</div>