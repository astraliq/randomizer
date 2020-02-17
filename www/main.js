function changeStatus(typeModul, typeDesc) {
    let textMore = document.getElementById(typeModul);
    let descLength = document.getElementById(typeDesc).textContent.length;
    let className = document.getElementById(typeDesc);    

    if (descLength > 350) {textMore.innerHTML = 'Больше описания';}

    else {
        textMore.innerHTML = '';
        className.style.height = 'auto';
    }
    
    textMore.innerHTML = '';

};
