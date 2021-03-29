[English Document](README_EN.md)

## 安装
```
npm install node-console-formatter
```

## 使用
```
// 什么也不用做，会自动替换console
require('node-console-formatter')

// 如果要输出到文件
require('node-console-formatter')(outputDir:'logs')
```

## 截图
```
// 仅打印文本
console.debug('This is a debug type log')
console.info('This is a info type log')
console.warn('This is a warn type log')
console.error('This is a error type log')
```
![](screenshot/text.png)

```
// 打印对象
const test = {name: 'test', id: 100}
console.debug(test)
console.info(test)
console.warn(test)
console.error(test)
```
![](screenshot/object.png)

```
// 多参数打印
console.debug('current time:', new Date())
console.info('current time:', new Date())
console.warn('current time:', new Date())
console.error('current time:', new Date())
```
![](screenshot/multiple.png)
