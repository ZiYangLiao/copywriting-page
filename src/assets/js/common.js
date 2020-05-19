//公共方法
const imgList = [];
for (let i = 0; i < 80; i++) {
    imgList[i] = require(`@imgUrl/${(i + 1)}.png`);
}
export const Tuzki = {
    // 返回随机颜色
    getColor() {
        
        let r = parseInt(Math.random() * 128 + 127);
        let g = parseInt(Math.random() * 128 + 127);
        let b = parseInt(Math.random() * 128 + 127);
        // let r = parseInt(Math.random() * 256);
        // let g = parseInt(Math.random() * 256);
        // let b = parseInt(Math.random() * 256);

        return `rgba(${r},${g},${b},1)`;
    },
    //返回随机图片
    getImgUrl(list) {
        if (!list) list = imgList;
        let randow = Math.floor(Math.random() * imgList.length);
        return imgList[randow];
    }
}