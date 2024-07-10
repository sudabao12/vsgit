let word = 'javascript';
let words = Array.from(word);
console.log(words);


let text = document.getElementById('text');

let inputs = [];

words.forEach(element => {
   let input = document.createElement('input');
   input.maxLength = 1;
   input.value = element;
   if(Math.random()<0.3){
    input.value ='';
   }
   text.appendChild(input);

   inputs.push(input);
   input.addEventListener('input',()=>{
        check();   
   });
   input.defaultValue = element;

});

function check(){
    let allinput = true;
    inputs.forEach(input => {
        let inputvalue = input.value;
            if (/^[a-zA-Z]?$/.test(inputvalue)) {
                   
                } else {
                    input.value = '';
                    alert('请输入英文字母或留空');
                }
                if (inputvalue === '') {
                    allinput = false;
                }
            });
    /* let allinput = inputvalue.every( value => value !==''); */
    
        if(allinput){
            let userinput = inputs.map(input => input.value).join('');
            if(userinput===word){
                inputs.forEach(input=>{
                    input.classList.remove('incorrect');
                    input.classList.add('correct');
                });
                console.log('成功');
    
            }else{
                inputs.forEach(input =>{
                    input.classList.remove('correct');
                    input.classList.add('incorrect');
                });
                console.log('失败');
                setTimeout(() => {
                  
                        inputs.forEach(input => {
                            
                                if (input.value !== input.defaultValue) { 
                                    input.value = '';
                                }
                                input.classList.remove('incorrect');
                            
                        
                       
                    });
                }, 1000);
            }
        }
    
    
}