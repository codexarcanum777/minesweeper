import { Container, Sprite } from 'pixi.js'
import * as Helper from '../helper'

export function handlerAction (event, context) {
  if (context.over) return

  const target = event.target
  const buttonValue = event.data.button
  const valueI = target.mapI
  const valueJ = target.mapJ
  const value = context.map[valueI][valueJ]

  if (buttonValue === 0) {
    if (value >= 1) {
      context.playMap[valueI][valueJ] = value
    } else if (value === 0) {
      Helper.Game.expandEmptyPlace(context.map, context.playMap, context.x, context.y, valueI, valueJ)
    } else if (value === -1) {
      context.playMap[valueI][valueJ] = -1
    }
  } else if (buttonValue === 2) {
    if (context.playMap[valueI][valueJ] === -3) {
      context.playMap[valueI][valueJ] = 0
    } else if (context.playMap[valueI][valueJ] === 0 && context.placeMines < context.mines) {
      context.playMap[valueI][valueJ] = -3
    }
  }

  context.placeMines = Helper.Game.minePlayed(context.playMap, context.y, context.x)
}

export function init (context) {
  const sizeX = context.width / context.x
  const sizeY = context.height * 0.8 / context.y

  for (let i = 0; i < context.x; i++) {
    for (let j = 0; j < context.y; j++) {
      const cell = new Sprite(context.textures[0])

      cell.x = i * sizeX
      cell.y = j * sizeY
      cell.mapI = i
      cell.mapJ = j
      cell.width = sizeX
      cell.height = sizeY
      cell.eventMode = 'static'
      cell.cursor = 'pointer'
      cell.on('pointerdown', (event) => {
        handlerAction(event, context)
      })

      context.containers.gameTableContainer.addChild(cell)
    }
  }

  context.startTime = Date.now()
  context.placeMines = 0
}

export function render (context) {
  for (let i = 0; i < context.containers.gameTableContainer.children.length; i++) {
    const sprite = context.containers.gameTableContainer.children[i]
    const valueI = sprite.mapI
    const valueJ = sprite.mapJ
    const value = context.playMap[valueI][valueJ]

    if (value >= 0) {
      sprite.texture = context.textures[value]
    } else if (value === -2) {
      sprite.texture = context.textures[10]
    } else if (value === -3) {
      sprite.texture = context.textures[11]
    } else if (value === -1) {
      sprite.texture = context.textures[12]
    }
  }

  const [over, won] = Helper.Game.isOver(context.map, context.playMap, context.x, context.y, context.mines)

  if (over) {
    context.over = true
    context.app.ticker.stop()

    if (won) {
      console.log('you win!!')
      context.containers.gameContainer.addChild(context.containers.gameWonContainer)
    } else {
      console.log('you lose!!')
      context.containers.gameContainer.addChild(context.containers.gameOverContainer)
    }
  }
}

export function update (context) {
  context.currentTime = new Date().getTime() - context.startTime
  context.texts.gameTextTime.text = Math.floor(context.currentTime / 1000)
  context.texts.gameTextMine.text = `${context.placeMines}/${context.mines}`
}

export function show (context) {
  context.app.stage.removeChildren()
  context.containers.gameContainer.removeChildren()
  context.containers.gameTableContainer.removeChildren()

  context.containers.gameContainer.addChild(context.containers.gameTableContainer, context.containers.gameScoreContainer)
  context.app.stage.addChild(context.containers.gameContainer)
  context.renderContainer = () => { render(context) }
  context.updateContainer = () => { update(context) }
  context.over = false
}

export function createScore (context) {
  const container = new Container()
  const background = new Sprite(context.textures[14])
  background.width = context.app.screen.width
  background.height = context.app.screen.height * 0.1

  const textTime = Helper.Graphics.createText(0, background.width / 4, background.height / 2)
  const textMine = Helper.Graphics.createText(context.placeMine, background.width - (background.width / 4), background.height / 2)

  container.addChild(background, textTime, textMine)

  context.containers.gameScoreContainer = container
  context.texts.gameTextTime = textTime
  context.texts.gameTextMine = textMine
}

export function createTable (context) {
  const container = new Container()
  container.height = context.app.screen.height * 0.9
  container.position.y = context.app.screen.height * 0.1

  context.containers.gameTableContainer = container
}

export function createGame (context) {
  const container = new Container()
  container.addChild(context.containers.gameTableContainer)

  context.containers.gameContainer = container
}

export function create (context) {
  createTable(context)
  createScore(context)
  createGame(context)
}

export function resetCurrentGame (context) {
  Helper.Game.generateMap(context.x, context.y, context.mines).then((result) => {
    [context.map, context.playMap] = result

    show(context)
    init(context)
    context.over = false
    context.app.ticker.start()
  })
}
