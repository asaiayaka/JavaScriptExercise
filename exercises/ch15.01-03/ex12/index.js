javascript:(function(){
  const text = window.getSelection().toString().trim();
  if(!text){
    alert('要約したいテキストを選択してから実行してください');
    return;
  }
  const url = 'https://chat.openai.com/?prompt=' + encodeURIComponent('次の文章を短く要約してください:\n\n' + text);
  window.open(url, '_blank');
})();
