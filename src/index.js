import { Application } from 'pixi.js'
import * as Constant from './constants'
import * as Helper from './helper'
import * as Containers from './containers'

(async () => {
  const app = new Application()
  await app.init({ width: Constant.WIDTH, height: Constant.HEIGHT, backgroundAlpha: 0 })
  app.canvas.addEventListener('contextmenu', (event) => { event.preventDefault() })
  document.body.appendChild(app.canvas)

  Helper.Graphics.loadTextures().then((textures) => {
    const context = {
      app,
      textures,
      x: Constant.X,
      y: Constant.Y,
      mines: Constant.MINES,
      width: Constant.WIDTH,
      height: Constant.HEIGHT,
      over: false,
      map: [[]],
      playMap: [[]],
      placeMine: 0,
      currentTime: null,
      startTime: null,
      endTime: null,
      placeMines: 0,
      containers: {
        menuContainer: null,
        gameContainer: null,
        gameTableContainer: null,
        gameScoreContainer: null,
        gameWonContainer: null,
        gameOverContainer: null
      },
      texts: {
        gameTextMine: null,
        gameTextTime: null
      },
      updateContainer: () => {},
      renderContainer: () => {}
    }

    Containers.Menu.create(context)
    Containers.Game.create(context)
    Containers.GameWon.create(context)
    Containers.GameOver.create(context)

    function init () {
      app.stage.addChild(context.containers.menuContainer)
    }

    function start () {
      app.ticker.add(gameLoop)
    }

    function stop () {
    }

    function update () {
      context.updateContainer()
    }

    function render () {
      context.renderContainer()
    }

    function gameLoop () {
      update()
      render()
    }

    init()
    start()
  }).catch((err) => {
    console.error(err)
  })
})()
