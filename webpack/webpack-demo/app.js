import Layer from './src/component/layer/layer.js'
import './src/style/common.css'

function app() {
    let dom = document.getElementById('app')
    let layer = new Layer()
    dom.innerHTML = layer.tpl
}

app();