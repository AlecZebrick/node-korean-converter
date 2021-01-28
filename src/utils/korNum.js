
function digitsToHangul(number) {
        if (number === '0')
            return '영';

       number = number.replace(/,/g, '');

        // numbers = parseInt(parsedNumbers, 10)
    
        let korNumbers = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
        let korBigNumbers = ['천', '백', '십', ''];
        let korHugeNumbers =  ['', '만', '억', '조', '경'];
        let result = [];

        // How many big names???
        let unitCnt = Math.ceil(number.length / 4);
    


        // How many digits need to be given names
        number = number.padStart(unitCnt * 4, '0')



        let regexp = /[\w\W]{4}/g; 
        let array = number.match(regexp);


        for (let i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
            let hangul = korean(array[i]);
            if (hangul == '')
                continue;
            result.unshift(hangul + korHugeNumbers[unitCnt]);

        }

        function korean(text) {
            let string = '';
                for (let i = 0; i < text.length; i++) {
                    let number = text[i];

                    if (number == '0')
                    continue;

                    string += korNumbers[number] + korBigNumbers[i];
                }
                return string;
                }
                return result.join('');
        }

    

// const red = digitsToHangul(process.argv[2])
// const redIll = red.replace(/일([백|십|만|천|경]{1})/g, '$1')

module.exports = digitsToHangul