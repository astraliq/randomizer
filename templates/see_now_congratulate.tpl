<div class="see-now-main-data">
    <div class="see-now-cat"><a class="see-now-cat-link" href="/congratulate">Поздравление</a></div>
    <div class="data-desc">
        <div class="see-now-text">
            <p class="cong-cat">Тема: 
            	<a class="cong-cat-link">{{ content.browseNowData.congrData.theme }}</a>.
            	<br>
            	<a class="cong-cat-link">{{ content.browseNowData.congrData.who }}</a>
            </p>
            <div class="see-now-wrapper">
                <label for="button-cg" onclick="changeStatus('congr', 'congr_text')" id="congr">Больше описания</label>
                <input type="checkbox" id="button-cg">
                <p class="congr-text" id="congr_text">{{ content.browseNowData.congrData.congratulate|raw }}</p>
            </div>
        </div>
    </div>
</div>